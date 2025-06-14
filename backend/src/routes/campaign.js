// Routes de gestion des campagnes publicitaires
const express = require('express');
const router = express.Router();
const { createCampaign, getMyCampaigns } = require('../controllers/campaignController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Créer une campagne (réservé aux annonceurs)
router.post('/', authenticateToken, authorizeRoles('ADVERTISER'), createCampaign);
// Récupérer les campagnes de l'annonceur connecté
router.get('/mine', authenticateToken, authorizeRoles('ADVERTISER'), getMyCampaigns);

module.exports = router; 