const express = require('express')
const { addPicture, getAllPictures, getPicture, updatePicture, deletePicture } = require('../controllers/picture.Controller')

const router = express.Router();

router.post('/picture', addPicture);
router.get('/pictures', getAllPictures);
router.get('/picture/:id', getPicture);
router.put('/picture/:id', updatePicture);
router.delete('/picture/:id', deletePicture);

module.exports = {
    routes: router
}