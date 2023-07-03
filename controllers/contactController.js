const contacts = require("../models/contactModel");

// Get all contacts
const getContacts = async (req, res, next) => {
  try {
    const contact = await contacts.find({ user_id: req.body.userId });
    res.status(200).json(contact);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

/// Create New contact
const createContact = async (req, res, next) => {
  try {
    console.log("The request body is:", req.body);
    const { name, gender, email, phone } = req.body; // Destructuring the request 
    if (!name || !gender || !email || !phone) {
      // If any of the fields are empty then throw an error
      return res.status(400).json({ msg: "All fields are mandatory!" });
    }
    const contact = await contacts.create({
      name,
      email,
      gender,
      phone,
      user_id: req.body.userId,
    });
    res.status(201).json(contact);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

// Update contact
const updateContact = async (req, res, next) => {
  try {
    const contact = await contacts.findById(req.params.id);

    if (!contact) {
      // If contact not found
      res.status(404);
      res.json("Contact not found");
    }

    if (contact.user_id.toString() !== req.body.userId) {
      // If the user id is not equal to the user id in the request then throw an error
      res.status(403);
      res.json("User doesn't have permission to update other user contacts");
    }

    const updateContact = await contacts.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).json(updateContact);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

// Delete contact
const deleteContact = async (req, res, next) => {
  try {
    const contact = await contacts.findById(req.params.id);

    if (!contact) {
      // If contact not found
      res.status(404);
      res.json("Contact not found");
    }

    if (contact.user_id.toString() !== req.body.userId) {
      // If the user id is not equal to the user id in the request then throw an error
      res.status(403);
      res.json("User doesn't have permission to update other user contacts");
    }

    // Find the item by its id and delete it
    const deleteExpense = await contacts.findByIdAndDelete(req.params.id);
    res.status(200).json("Contact Deleted");
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

module.exports = { getContacts, createContact, updateContact, deleteContact };
