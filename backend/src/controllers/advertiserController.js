// Contrôleur annonceur pour Jobal
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { email, password, company, contact } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }
  try {
    const existing = await prisma.advertiser.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email déjà utilisé.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const advertiser = await prisma.advertiser.create({
      data: { email, password: hashedPassword, company, contact },
    });
    res.status(201).json({ message: 'Inscription annonceur réussie.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Champs requis.' });
  }
  try {
    const advertiser = await prisma.advertiser.findUnique({ where: { email } });
    if (!advertiser) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }
    const valid = await bcrypt.compare(password, advertiser.password);
    if (!valid) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }
    const token = jwt.sign({ advertiserId: advertiser.id, role: 'ADVERTISER' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, advertiser: { id: advertiser.id, email: advertiser.email, company: advertiser.company } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { register, login }; 