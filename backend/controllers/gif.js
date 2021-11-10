const fs = require("fs");

const db = require("../models");
const Gif = db.gif;

// Crée un GIF
exports.createGif = (req, res, next) => {
    let gifObject = req.body;

    gifObject = JSON.parse(req.body.gif);
    gifObject.gifUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    Gif.create({
        ...gifObject,
        userId: req.userId
    }).then(() => res.status(201).json({ message: "Publication Crée !" }))
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
exports.modifyGif = (req, res, next) => {


    if (req.file) {
        Gif.findOne({ where: { id: req.params.id } })
            .then(gif => {
                const filename = gif.gifUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const gifObject = {
                        ...JSON.parse(req.body.gif),
                        gifUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Gif.update({ ...gifObject }, { where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        Gif.findOne({ where: { id: req.params.id } })
            .then(gif => {
                const gifObject = {
                    ...JSON.parse(req.body.gif),
                    gifUrl: gif.gifUrl
                }
                Gif.update({ ...gifObject }, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                    .catch(error => res.status(400).json({ error }));
            })
    }
};

// Supprime un GIF
exports.deleteGif = (req, res, next) => {
    Gif.findOne({ where: { id: req.params.id } })
        .then(gif => {
            const filename = gif.gifUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Gif.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};