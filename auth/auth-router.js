const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/model.js");
const secrets = require("../api/secrets.js");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.add(user)
       .then(reg => {
         res.status(201).json(reg)
       })
       .catch(error => {
         console.log(error);
         res.status(500).json({ errorMessage: error.message });
       })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;