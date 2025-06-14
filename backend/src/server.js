// Fichier de démarrage du serveur Express
const app = require('./app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serveur Jobal backend démarré sur le port ${PORT}`);
}); 