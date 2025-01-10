const axios = require('axios');
const Crypto = require('../models/crypto'); // Crypto model to interact with DB

const fetchCryptoData = async () => {
  const COINS = ['bitcoin', 'matic-network', 'ethereum'];

  for (const coin of COINS) {
    try {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: coin,
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_change: true,
        },
      });

      const coinData = data[coin];

      // Insert the new record into the database
      const newRecord = await Crypto.create({
        name: coin,
        symbol: coin,
        price: coinData.usd,
        marketCap: coinData.usd_market_cap,
        change24h: coinData.usd_24h_change,
        updatedAt: new Date(),
      });

      console.log(`Data for ${coin} updated successfully.`);

      // Check if the total number of records for the coin exceeds 100
      const totalRecords = await Crypto.countDocuments({ name: coin });

      console.log(totalRecords);

      if (totalRecords > 100) {
        // Delete the oldest record if there are more than 100 records
        const oldestRecord = await Crypto.findOne({ name: coin }).sort({ updatedAt: 1 }).limit(1);
        if (oldestRecord) {
          await Crypto.deleteOne({ _id: oldestRecord._id });
          console.log(`Oldest record for ${coin} deleted.`);
        }
      }

    } catch (error) {
      console.error(`Error fetching data for ${coin}:`, error.message);
    }
  }
};

module.exports = fetchCryptoData;
