// Routes utilisateur protégées
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Récupérer le profil utilisateur
router.get('/me', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.userId }, select: { id: true, email: true, username: true, role: true, createdAt: true } });
  res.json(user);
});

// Mettre à jour le profil utilisateur
router.put('/me', authenticateToken, async (req, res) => {
  const { username } = req.body;
  const user = await prisma.user.update({ where: { id: req.user.userId }, data: { username } });
  res.json({ message: 'Profil mis à jour', user: { id: user.id, email: user.email, username: user.username } });
});

module.exports = router; 