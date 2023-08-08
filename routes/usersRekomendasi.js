const express = require('express');
const router = express.Router();
const Multer = require('multer');
const usersRekomendasi = require('../services/usersRekomendasi');
const axios = require('axios');
const FormData = require('form-data');

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

//post 2 input_image and style_image and send request post on form data to https://model-lqczttpgfq-et.a.run.app/stylize
router.post('/:userId/rekomendasi', multer.fields([{ name: 'input_image', maxCount: 1 }, { name: 'style_image', maxCount: 1 }]), async function (req, res, next) {
  try {
    const { userId } = req.params;
    const { input_image, style_image } = req.files;

    const formData = new FormData();
    formData.append('input_image', input_image[0].buffer,{
      filename: input_image[0].originalname,
      contentType: input_image[0].mimetype
    });
    formData.append('style_image', style_image[0].buffer,{
      filename: style_image[0].originalname,
      contentType: style_image[0].mimetype
    });
    const config = {
      method: 'post',
      url: 'https://model-lqczttpgfq-et.a.run.app/stylize',
      data: formData
    };

    const response = await axios(config)
    const { url } = response.data;
    const fileUrl = url;
    res.json(await usersRekomendasi.createRekomendasi({ userId, fileUrl }));

  } catch (err) {
    console.error(`Error while registering user`, err.message);
    next(err);
  }
});





router.get('/test/test', async function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;