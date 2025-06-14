// Agrégation des routes principales
const express = require('express');
const router = express.Router();

// Exemples de sous-routes (à compléter)
// router.use('/auth', require('./auth'));
// router.use('/users', require('./users'));

router.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l’API Jobal !' });
});

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/advertisers', require('./advertiser'));
router.use('/campaigns', require('./campaign'));
router.use('/withdrawals', require('./withdrawal'));
router.use('/ptc', require('./ptc'));
router.use('/surveys', require('./survey'));
router.use('/microtasks', require('./microtask'));
router.use('/offerwalls', require('./offerwall'));

module.exports = router; 