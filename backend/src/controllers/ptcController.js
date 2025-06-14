// Contrôleur PTC (Paid-to-Click) pour Jobal
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Lister les publicités PTC actives et non vues par l'utilisateur
const listPTCAds = async (req, res) => {
  const userId = req.user.userId;
  try {
    // Récupérer les IDs des pubs déjà vues
    const views = await prisma.userPTCView.findMany({ where: { userId }, select: { adId: true } });
    const seenAdIds = views.map(v => v.adId);
    // Lister les pubs actives non vues
    const ads = await prisma.paidToClickAd.findMany({
      where: { isActive: true, id: { notIn: seenAdIds } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Marquer une pub comme vue et créditer l'utilisateur
const viewPTCAd = async (req, res) => {
  const userId = req.user.userId;
  const { adId } = req.body;
  if (!adId) return res.status(400).json({ message: 'adId requis.' });
  try {
    // Vérifier si déjà vue
    const already = await prisma.userPTCView.findFirst({ where: { userId, adId } });
    if (already) return res.status(400).json({ message: 'Déjà vue.' });
    // Marquer comme vue
    await prisma.userPTCView.create({ data: { userId, adId, rewarded: true } });
    // Créditer l'utilisateur (ici, incrémenter un champ fictif, à adapter)
    // await prisma.user.update({ where: { id: userId }, data: { balance: { increment: ad.reward } } });
    // Incrémenter viewsDone sur la pub
    await prisma.paidToClickAd.update({ where: { id: adId }, data: { viewsDone: { increment: 1 } } });
    res.json({ message: 'Récompense créditée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { listPTCAds, viewPTCAd }; 