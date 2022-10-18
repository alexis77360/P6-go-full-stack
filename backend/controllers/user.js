
//! npm install bcrypt  (pour crypter le mot de passe)
const bcrypt = require('bcrypt');

//! npm install jsonwebtoken
const jwt = require('jsonwebtoken');

const User = require('../models/User');


//? création d'un utilisateur en cryptant un mdp
exports.signup = (req, res, next) => {
    //? hashage du mot de passe ( 10 tours de hashage)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));
    })
    //! 500 Erreur Serveur
    .catch(error => res.status(500).json({ error }));

};

//? connexion d'un utilisateur en comparant le mdp crypté
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        //! User id pour l'authentification des produits pour chaque utilisateur
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};