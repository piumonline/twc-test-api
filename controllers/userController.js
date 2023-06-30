const users = require("../models/userModel");
const bcrypt = require("bcrypt"); //for hash pwd
const jwt = require("jsonwebtoken"); //for token


// Register new user
const registerUser = async (req, res) => {
    try {
        const { email, password} = req.body; //destructuring
        if ( !email || !password) { //if any of the fields are empty
            return res.status(400).json({msg: "Not all fields have been entered."});
        }
        const userAvailable = await users.findOne({email: email}); //check if user already exists
        if(userAvailable) {
            return res.status(400).json({msg: "User already exists."});
        }
        //hashing password
        const hashPassword = await bcrypt.hash(password, 10);

        //if any of the fields are not empty and user already not exists create new user
        const newUser = await users.create({
            email: email,
            password: hashPassword
        });
        //user created
        console.log("user created");

        if(user){ //if user created successfully
            res.status(201).json({
                _id: user._id,
                email: user.email,
            })
        } else{
            res.status(400).json({msg: "User not created."});
        }

    } catch (err) {
      res.json(err);
  }
  };

  // Login user
  const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body; //destructuring
        if (!email || !password) { //if any of the fields are empty
            return res.status(400).json({msg: "Not all fields have been entered."});
        }

        const user = await users.findOne({email: email}); //check if user already exists
        if(user && (await bcrypt.compare(password, user.password))) { //if user exists and password matches
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
              });
              return res.status(200).send({
                success: true,
                message: "Login Successfully",
                token,
                user,
              });            
        }else{
            res.status(401).json({msg: "Invalid credentials."});
        }
    }
    catch (err) {
        res.status(500).json(err);
  }
};

 // Get current user
    const currentUser = async (req, res) => {
        try {
            const user = await users.findOne({ _id: req.body.userId });
            return res.status(200).send({
              success: true,
              message: "User Fetched Successfully",
              user,
            });
          } catch (error) {
            console.log(error);
            return res.status(500).send({
              success: false,
              message: "unable to get current user",
              error,
            });
          }
    }
  module.exports = { registerUser, loginUser, currentUser };

