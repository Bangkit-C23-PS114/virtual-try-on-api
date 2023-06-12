const express = require('express');
const router = express.Router();
const usersRekomendasi = require('../services/usersRekomendasi');

//all users
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await usersRekomendasi.usersRekomendasi(req.params.id));
  }
  catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

module.exports = router;