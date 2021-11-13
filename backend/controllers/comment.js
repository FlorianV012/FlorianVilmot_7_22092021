const db = require("../models");

const Comment = db.comment;

// Crée un commentaire
exports.createComment = (req, res, next) => {
    let commentObject = req.body;

    Comment.create({
        comment: commentObject.comment,
        gifId: req.params.postId,
        userId: req.userId
    }).then(() => res.status(201).json({ message: "Publication Crée !" }))
        .catch(error => res.status(400).json({ error }));
};

// Affiche tous les commentaires
exports.getAllComment = (req, res, next) => {
    Comment.findAll({
        where: { gifId: req.params.postId }
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }));
};

// Modifie un commentaire
exports.modifyComment = (req, res, next) => {
    Comment.findOne({
        where: { gifId: req.params.postId, id: req.params.id }
    })
        .then(() => {
            let commentObject = req.body;

            Comment.update({
                comment: commentObject.comment,
                gifId: req.params.postId,
                userId: req.userId

            }, { where: { gifId: req.params.postId, id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

// Supprime un commentaire
exports.deleteComment = (req, res, next) => {

    Comment.destroy({
        where: { gifId: req.params.postId, id: req.params.id }
    })
        .then(() => res.status(200).json({ message: "commentaire supprimé" }))
        .catch(error => res.status(400).json({ error }));


};

/* // Affiche le commentaire selectionné
exports.getOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => res.status(200).json({ comment }))
        .catch(error => res.status(404).json({ error }))
};



// Like ou dislike un commentaire
exports.likeComment = (req, res, next) => { }; */