const express=require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const contactsRoutePath=require("./routes/contactRoutes");
const usersRoutePath=require("./routes/usersRoutes");
const connectDb = require("./config/dbConnection");

const PORT = process.env.PORT || 8080;
const app=express();

//db connection
connectDb();

//use cors
app.use(cors());

//middleware
app.use(express.json())
app.use("/api/contacts", contactsRoutePath); 
app.use("/api/", usersRoutePath); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  