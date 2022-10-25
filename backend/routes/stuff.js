const express = require('express');
//? identifie les routes 

const router = express.Router();
//? importation du middleware d'authentification

const auth = require('../middleware/auth');
//? importation du middleware de gestion des images

const multer = require('../middleware/multer-config');
//? importation du controller

const stuffCtrl = require('../controllers/stuff');


//! mettre Auth en 2eme parametre pour sécuriser les routes
router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

//? exportation du router
module.exports = router;