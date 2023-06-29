const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/register', registerUser);   
router.post('/login', loginUser);   
router.get('/user', authMiddleware, currentUser);  



module.exports = router;