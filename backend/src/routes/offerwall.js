// Routes pour les offerwalls
const express = require('express');
const router = express.Router();
const { listOfferwalls } = require('../controllers/offerwallController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Lister les offerwalls actifs
router.get('/', authenticateToken, authorizeRoles('USER'), listOfferwalls);

module.exports = router; 