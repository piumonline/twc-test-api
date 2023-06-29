const contacts = require("../models/contactModel");

// Get all contacts
const getContacts = async (req, res) => {
    try {
      const contact = await contacts.find();
      res.status(200).json(contact);
    } catch (err) {
      res.json(err);
  }
  };


//Create New contact
const createContact = async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, gender, email, phone } = req.body; //destructuring the request 
  if (!name || !gender || !email || !phone) { //if any of the fields are empty then throw error
    res.status(400);
    res.status(400).json({msg: "All fields are mandatory !"});
  }
  const contact = await contacts.create({
    name,
    email,
    gender,
    phone,
  });
  res.status(201).json(contact);
};

//Update contact
const updateContact = async (req, res) => {
  try {
    const updateContact = await contacts.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      }
    );
    res.status(200).json(updateContact);
    } catch (err) {
      res.json(err);
  };

  res.status(200).json(updateContact);
};

//Delete contact
const deleteContact = async (req, res) => {
  try {
    //find the item by its id and delete it
    const deleteExpense = await contacts.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json("contact Deleted");
  } catch (err) {
    res.json(err);
  }
};

module.exports = { getContacts,  createContact,  updateContact,  deleteContact, };
