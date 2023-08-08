const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function allRekomendasi({ userId }) {
  const rows = await db.query(
    `SELECT id, userId,  fileUrl FROM usersRekomendasi WHERE userId = ?`,
    [userId]
  );
  const data = helper.emptyOrRows(rows);
  return  {
    data
  }
}

async function getRekomendasi({ userId, id }) {
  const rows = await db.query(
    `SELECT id, userId,  fileUrl FROM usersRekomendasi WHERE userId = ? AND id = ?`,
    [userId, id]
  );
  const data = helper.emptyOrRows(rows);
  return  {
    data
  }
}

async function createRekomendasi({ userId,  fileUrl }) {
  console.log(userId, fileUrl)
  const result = await db.query(
    `INSERT INTO usersRekomendasi (userId,  fileUrl) VALUES (?, ?)`,
    [userId, fileUrl]
  );

  const rows = await db.query(
    `SELECT id, userId,  fileUrl FROM usersRekomendasi WHERE userId = ? AND fileUrl = ?`,
    [userId, fileUrl]
  );

  const data = helper.emptyOrRows(rows);
  const message = 'Rekomendasi created';

  return {
    message,
    data
  }
}

module.exports = {
  allRekomendasi,
  getRekomendasi,
  createRekomendasi
}