const fs = require("fs");

const db = require("../models");
const user = require("../models/user");
const Gif = db.gif;

// Crée un gif
exports.createGif = (req, res, next) => {

    Image.create({
        title: req.body.title,
        type: req.file.mimetype,
        gif_name: req.file.originalname,
        data: fs.readFileSync(
            __basedir + "/resources/static/assets/uploads/" + req.file.filename
        ),
        userID: user.id
    }).then(() => res.status(201).json({ message: "Post Crée !" }))
        .catch(error => res.status(400).json({ error }));


};

