const express = require('express');
const router = express.Router();

// Importer le contrôleur d'authentification
const authController = require('../controllers/authController');

// Définir les routes pour l'authentification
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;