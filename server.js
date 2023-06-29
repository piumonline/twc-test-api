const express=require("express");
const dotenv = require("dotenv").config();
const routePath=require("./routes/contactRoutes");
const connectDb = require("./config/dbConnection");

const PORT = process.env.PORT || 8080;

//db connection
connectDb();
const app=express();


//middleware
app.use(express.json())
app.use("/contacts", routePath); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  