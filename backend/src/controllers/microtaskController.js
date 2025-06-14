// Contrôleur pour les micro-tâches (MicroTask)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listMicroTasks = async (req, res) => {
  try {
    const tasks = await prisma.microTask.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { listMicroTasks }; 