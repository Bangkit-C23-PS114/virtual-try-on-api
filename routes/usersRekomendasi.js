const express = require('express');
const router = express.Router();
const Multer = require('multer');
const usersRekomendasi = require('../services/usersRekomendasi');
const ImgUpload = require('../modules/imgUpload');


const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
})

//all users
router.get('/:userId/rekomendasi', async function (req, res, next) {
  try {
    res.json(await usersRekomendasi.allRekomendasi(req.params));
  }
  catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.get('/:userId/rekomendasi/:id', async function (req, res, next) {
  try {
    res.json(await usersRekomendasi.getRekomendasi(req.params));
  }
  catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.post('/:userId/save', multer.single('file'), ImgUpload.uploadToGcs, async function (req, res, next) {
  try {
    const data = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.fileName = req.file.cloudStoragePublicUrl;
    }
    const { userId } = req.params;
    const fileUrl = data.fileName;
    res.json(await usersRekomendasi.createRekomendasi({ userId, fileUrl }));
  } catch (err) {
    console.error(`Error while saving rekomendasi`, err.message);
    next(err);
  }
});

module.exports = router;