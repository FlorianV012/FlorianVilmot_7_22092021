const fs = require("fs");

const db = require("../models");
const user = require("../models/user");
const Gif = db.gif;

// Crée un GIF
exports.createGif = (req, res, next) => {
    let gifObject = req.body;

    gifObject = JSON.parse(req.body.gif);
    gifObject.gifUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    Gif.create({
        ...gifObject,
        //userId: user.id
    }).then(() => res.status(201).json({ message: "Post Crée !" }))
        .catch(error => res.status(400).json({ error }));


};

// Affiche tous les GIFs
exports.getAllGif = (req, res, next) => {
    Gif.findAll()
        .then(gif => res.status(200).json(gif))
        .catch(error => res.status(400).json({ error }));
};

// Affiche le GIF selectionné
exports.getOneGif = (req, res, next) => {
    Gif.findOne({ where: { id: req.params.id } })
        .then(gif => res.status(200).json({ gif }))
        .catch(error => res.status(404).json({ error }))
};

// Modifie un GIF
exports.modifyGif = (req, res, next) => { };

// Supprime un GIF
exports.deleteGif = (req, res, next) => { };

// Like ou dislike un GIF
exports.likeGif = (req, res, next) => { };