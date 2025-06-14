// Contrôleur pour les sondages rémunérés (Survey)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listSurveys = async (req, res) => {
  try {
    const surveys = await prisma.survey.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { listSurveys }; 