const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require("bcrypt")

async function allUsers() {
  const rows = await db.query(
    `SELECT id, firstName, lastName, CONCAT(firstName, ' ', lastName) AS fullName, email FROM users`
  );
  const data = helper.emptyOrRows(rows);
  return  {
    data
  }
}

async function getUser({ id }) {
  const rows = await db.query(
    `SELECT id, firstName, lastName, CONCAT(firstName, ' ', lastName) AS fullName, email FROM users WHERE id = ?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  return  {
    data
  }
}

async function authenticate({ email, password }) {
  //check if user exists
  const users = await db.query(
    ` SELECT id, firstName, lastName, CONCAT(firstName, ' ', lastName) AS fullName, email, password FROM users
      WHERE email = ?`,
    [email]
  );

  if (!users.length) throw 'User not found';

  const user = users[0];

  //check if password is correct
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) throw err;
  });

  const data = helper.emptyOrRows(users);
  const message = 'Authentication successful';
  
  return {
    message,
    data
  }
}

async function register({ firstName, lastName, email, password }) {
  //check if user exists
  const users = await db.query(
    `SELECT id, email, password FROM users WHERE email = ?`,
    [email]
  );

  if (users.length) throw 'User already exists';

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //register user
  const result = await db.query(
    `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, hashedPassword]
  );
  
  const user = await db.query(
    `SELECT id, firstName, lastName, CONCAT(firstName, ' ', lastName) AS fullName, email FROM users WHERE email = ?`,
    [email]
  );

  const data = helper.emptyOrRows(user);
  const message = 'User created';

  return {
    message,
    data
  }
}

module.exports = {
  authenticate,
  getUser,
  allUsers,
  register
}