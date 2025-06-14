// Contrôleur de retraits pour Jobal
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Demander un retrait
const requestWithdrawal = async (req, res) => {
  const userId = req.user.userId;
  const { amount, method, details } = req.body;
  if (!amount || !method) return res.status(400).json({ message: 'Montant et méthode requis.' });
  try {
    const withdrawal = await prisma.withdrawal.create({
      data: { userId, amount, method, details, status: 'PENDING' },
    });
    res.status(201).json({ message: 'Demande de retrait enregistrée', withdrawal });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Historique des retraits utilisateur
const getMyWithdrawals = async (req, res) => {
  const userId = req.user.userId;
  try {
    const withdrawals = await prisma.withdrawal.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { requestWithdrawal, getMyWithdrawals }; 