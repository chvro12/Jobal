// Routes PTC (Paid-to-Click)
const express = require('express');
const router = express.Router();
const { listPTCAds, viewPTCAd } = require('../controllers/ptcController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Lister les pubs PTC disponibles
router.get('/', authenticateToken, authorizeRoles('USER'), listPTCAds);
// Marquer une pub comme vue et créditer
router.post('/view', authenticateToken, authorizeRoles('USER'), viewPTCAd);

module.exports = router; 