const express = require('express');
const router = express.Router();
const users = require('../services/users');

//all users
router.get('/', async function (req, res, next) {
  try {
    res.json(await users.allUsers());
  }
  catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});


//authenticate user
router.post('/authenticate', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await users.authenticate({ email, password });
    res.json(user);
  } catch (err) {
    console.error(`Error while authenticating user`, err.message);
    next(err);
  }
});

//register user
router.post('/register', async function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await users.register({ firstName, lastName, email, password });
    res.json(user);
  } catch (err) {
    console.error(`Error while registering user`, err.message);
    next(err);
  }
});

module.exports = router;