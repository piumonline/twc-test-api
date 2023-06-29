const express = require("express");
const router = express.Router();
const {  getContacts,  createContact,  updateContact,  deleteContact } = require("../controllers/contactController");
// const authMiddleware = require('../middleware/authMiddleware.js');

// router.use(authMiddleware); // Protect all routes below this line
// Define the routes for handling contacts
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact);

module.exports = router;
