const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const gifCtrl = require('../controllers/gif.js');


router.get('/', gifCtrl.getAllGif);
router.get('/:id', auth, gifCtrl.getOneGif);

router.post('/', auth, multer, gifCtrl.createGif);

router.put('/:id', auth, multer, gifCtrl.modifyGif);
router.delete('/:id', auth, gifCtrl.deleteGif);
router.post('/:id/like', auth, gifCtrl.likeGif);


module.exports = router;