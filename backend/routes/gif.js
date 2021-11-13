const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const gifCtrl = require('../controllers/gif.js');
const likeCtrl = require('../controllers/like');
const commentCtrl = require('../controllers/comment');



router.post('/', auth, multer, gifCtrl.createGif);
router.get('/', gifCtrl.getAllGif);
router.get('/:id', auth, gifCtrl.getOneGif);
router.put('/:id', auth, multer, gifCtrl.modifyGif);
router.delete('/:id', auth, gifCtrl.deleteGif);

router.post('/:id/like', auth, likeCtrl.likeGif);
router.post('/:id/dislike', auth, likeCtrl.dislikeGif);
router.get('/:id/allLike', auth, likeCtrl.likeCounter);


router.post('/:postId/comment', auth, commentCtrl.createComment);
router.get('/:postId/comment/', auth, commentCtrl.getAllComment);
router.put('/:postId/comment/:id', auth, commentCtrl.modifyComment);
router.delete('/:postId/comment/:id', auth, commentCtrl.deleteComment);
// router.get('/:postId/comment/:id', auth, commentCtrl.getOneComment);
// router.post('/:postId/comment/:id/like', auth, commentCtrl.likeComment);

module.exports = router;