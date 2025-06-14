// Modèle utilisateur de référence pour Prisma
// Le vrai modèle est dans prisma/schema.prisma

// Exemple de structure JS pour référence
module.exports = {
  id: 'string',
  email: 'string',
  username: 'string',
  password: 'string',
  isEmailVerified: false,
  role: 'USER', // ou 'ADVERTISER', 'ADMIN'
  createdAt: 'Date',
  updatedAt: 'Date',
}; 