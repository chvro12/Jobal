// Contrôleur de campagnes publicitaires pour Jobal
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Créer une campagne
const createCampaign = async (req, res) => {
  const { title, description, url, duration, viewsWanted, costTotal } = req.body;
  const advertiserId = req.user?.advertiserId;
  if (!advertiserId) return res.status(401).json({ message: 'Non autorisé' });
  try {
    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        url,
        duration,
        viewsWanted,
        costTotal,
        advertiserId,
      },
    });
    res.status(201).json({ message: 'Campagne créée', campaign });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Récupérer toutes les campagnes de l'annonceur
const getMyCampaigns = async (req, res) => {
  const advertiserId = req.user?.advertiserId;
  if (!advertiserId) return res.status(401).json({ message: 'Non autorisé' });
  try {
    const campaigns = await prisma.campaign.findMany({ where: { advertiserId } });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { createCampaign, getMyCampaigns }; 