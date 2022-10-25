const e = require('express');
const multer = require('multer');

//? mime type pour les images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


//? création d'un objet de configuration pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //? nom du fichier enregistré sur le serveur
    filename: (req, file, callback) => {
        //! on remplace les espaces par des underscores
        const name = file.originalname.split(' ').join('_');
        //! on récupère l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        //! on crée le nom du fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

//? on exporte l'élément multer configuré, on lui passe l'objet de configuration
module.exports = multer({ storage: storage }).single('image');
