// routes/register.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName,lastName, email, password, role,gender,age } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName,lastName, email, password: hashedPassword, role,gender,age });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

module.exports = router;
