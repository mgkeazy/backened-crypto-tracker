require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const connectDB = require('./database/connection');
const fetchCryptoData = require('./services/fetchCryptoData');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();

connectDB();

cron.schedule('0 */2 * * *', async () => {
  console.log('Running scheduled task to fetch crypto data');
  await fetchCryptoData();
});

app.use('/api/crypto',cryptoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
