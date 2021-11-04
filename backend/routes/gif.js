const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");

const gifCtrl = require('../controllers/gif.js');


router.get('/', gifCtrl.getAllGif);
router.get('/:id', gifCtrl.getOneGif);

router.post('/', multer, gifCtrl.createGif);

router.put('/:id', multer, gifCtrl.modifyGif);
router.delete('/:id', gifCtrl.deleteGif);
router.post('/:id/like', gifCtrl.likeGif);


module.exports = router;