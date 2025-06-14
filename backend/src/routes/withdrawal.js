// Routes de gestion des retraits utilisateurs
const express = require('express');
const router = express.Router();
const { requestWithdrawal, getMyWithdrawals } = require('../controllers/withdrawalController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Demander un retrait (utilisateur connecté)
router.post('/', authenticateToken, authorizeRoles('USER'), requestWithdrawal);
// Historique des retraits
router.get('/mine', authenticateToken, authorizeRoles('USER'), getMyWithdrawals);

module.exports = router; 