const express = require('express');
//? identifie les routes 
const auth = require('../middleware/auth');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

//! mettre Auth en 2eme parametre pour sécuriser les routes
router.get('/',auth, stuffCtrl.getAllStuff);
router.get('/:id', stuffCtrl.getOneThing);
router.post('/', stuffCtrl.createThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;