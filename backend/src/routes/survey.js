// Routes pour les sondages rémunérés
const express = require('express');
const router = express.Router();
const { listSurveys } = require('../controllers/surveyController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Lister les sondages actifs
router.get('/', authenticateToken, authorizeRoles('USER'), listSurveys);

module.exports = router; 