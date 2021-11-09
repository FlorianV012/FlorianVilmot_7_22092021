const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const gifCtrl = require('../controllers/gif.js');
const commentCtrl = require('../controllers/comment');


router.post('/', auth, multer, gifCtrl.createGif);
router.get('/', gifCtrl.getAllGif);
router.get('/:id', auth, gifCtrl.getOneGif);
router.put('/:id', auth, multer, gifCtrl.modifyGif);
router.delete('/:id', auth, gifCtrl.deleteGif);
router.post('/:id/like', auth, gifCtrl.likeGif);


// router.post('/:postId/comment', commentCtrl.createComment);
// router.get('/:postId/comment/', commentCtrl.getAllComment);
// router.get('/:postId/comment/:id', auth, commentCtrl.getOneComment);
// router.put('/:postId/comment/:id', auth, commentCtrl.modifyComment);
// router.delete('/:postId/comment/:id', auth, commentCtrl.deleteComment);
// router.post('/:postId/comment/:id/like', auth, commentCtrl.likeComment);

module.exports = router;