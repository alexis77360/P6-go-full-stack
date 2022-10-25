//? import express
const express = require('express');

//? Mongoose pour la BDD
const mongoose = require('mongoose');

//? créer une application express
const app = express();

//? importer le router
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//! ????????? cours 2 part 4
const path = require('path'); 


//? Connexion à la BDD
mongoose.connect("mongodb+srv://alexfavdev:alexis20@cluster0.oyormvk.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//? Intercepte du JSON équivalent à body-parser ( corps de la requete)
app.use(express.json());

//? créer une route GET pour tous les utilisateurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//? utiliser le router pour /api/stuff
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

//? exporter la constante app
module.exports = app;