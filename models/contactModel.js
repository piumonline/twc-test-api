const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    gender: {
      type: String,
      required: [true, "Please add the gender"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"],
    },
  }
);

module.exports = mongoose.model("contacts", contactSchema);
