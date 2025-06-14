// Contrôleur pour les offerwalls (Offerwall)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listOfferwalls = async (req, res) => {
  try {
    const offerwalls = await prisma.offerwall.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
    res.json(offerwalls);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { listOfferwalls }; 