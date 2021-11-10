const db = require("../models");
const Like = db.like;


// Like ou retire le like d'un GIF
exports.likeGif = (req, res, next) => {

    Like.count({
        where: { gifId: req.params.id, userId: req.userId }
    })
        .then(count => {
            if (count != 0) {
                Like.destroy({
                    where: { gifId: req.params.id, userId: req.userId }
                })
                    .then(() => res.status(200).json({ message: "Je n'aime plus!" }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                Like.create({ gifId: req.params.id, userId: req.userId, like: true })
                    .then(() => res.status(200).json({ message: "J'aime !" }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
};

// Dislike ou retire le dislike d'un GIF
exports.dislikeGif = (req, res, next) => {

    Like.count({
        where: { gifId: req.params.id, userId: req.userId }
    })
        .then(count => {
            if (count != 0) {
                Like.destroy({
                    where: { gifId: req.params.id, userId: req.userId }
                })
                    .then(() => res.status(200).json({ message: "J'aime !" }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                Like.create({ gifId: req.params.id, userId: req.userId, like: false })
                    .then(() => res.status(200).json({ message: "Je n'aime pas!" }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
};

// nb like/dislike d'un GIF
exports.likeCounter = (req, res, next) => {

    Like.findAll({
        where: { gifId: req.params.id }
    })
        .then(like => res.status(200).json(like))
        .catch(error => res.status(400).json({ error }));

};




exports.getAllLikes = (req, res, next) => {


    Like.findAllAndCountAll({
        where: { gifId: req.params.gifId, like: true }
    })
        .then((res) => {
            console.log(res);
        })



    /* Like.findAllAndCountAll({
        where: { gifId: req.params.gifId, like : false }
    }) */

};