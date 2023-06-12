const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function usersRekomendasi(id) {
  const rows = await db.query(
    `SELECT UserId,FileName,FileUrl FROM UsersRekomendasi WHERE UserId = ?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  return  {
    data
  }
}

module.exports = {
  usersRekomendasi
}