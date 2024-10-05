// routes/coaches.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.get('/adherents', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'secret_key');

  if (decoded.role !== 'coach') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const adherents = await User.find({ role: 'adherent' });
  res.json(adherents);
});

module.exports = router;
