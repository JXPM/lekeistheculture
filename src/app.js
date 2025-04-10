// backend/services/app.js
require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend Leke en marche !');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});