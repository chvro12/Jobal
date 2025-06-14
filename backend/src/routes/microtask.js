// Routes pour les micro-tâches
const express = require('express');
const router = express.Router();
const { listMicroTasks } = require('../controllers/microtaskController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Lister les micro-tâches actives
router.get('/', authenticateToken, authorizeRoles('USER'), listMicroTasks);

module.exports = router; 