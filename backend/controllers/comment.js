const fs = require("fs");

const db = require("../models");

const Comment = db.comment;

// Crée un commentaire
exports.createComment = (req, res, next) => { };

// Affiche tous les commentaires
exports.getAllComment = (req, res, next) => {
    Comment.findAll()
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }));
};

// Affiche le commentaire selectionné
exports.getOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => res.status(200).json({ comment }))
        .catch(error => res.status(404).json({ error }))
};

// Modifie un commentaire
exports.modifyComment = (req, res, next) => { };

// Supprime un commentaire
exports.deleteComment = (req, res, next) => { };

// Like ou dislike un commentaire
exports.likeComment = (req, res, next) => { };