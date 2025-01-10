const Crypto = require('../models/crypto'); 

const getLatestCryptoStats = async (req, res) => {
  try {
    const { coin } = req.query;
    // Check if the coin is valid
    const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
    if (!validCoins.includes(coin)) {
      return res.status(400).json({
        message: 'Invalid coin. Please choose from bitcoin, matic-network, or ethereum.',
      });
    }

    // Fetch the most recent data for the coin from MongoDB
    const latestRecord = await Crypto.findOne({ name: coin })
      .sort({ updatedAt: -1 }) 
      .limit(1);
        
    // Check if a record exists
    if (!latestRecord) {
      return res.status(404).json({ message: 'No data available for this coin.' });
    }

    // Return the latest data in the response
    return res.json({
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      "24hChange": latestRecord.change24h,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getCryptoDeviation = async (req, res) => {
    try {
      const { coin } = req.query;
  
      const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
      if (!validCoins.includes(coin)) {
        return res.status(400).json({ message: 'Invalid coin. Please choose from bitcoin, matic-network, or ethereum.' });
      }
  
      const cryptoRecords = await Crypto.find({ name: coin });
  
      if (cryptoRecords.length === 0) {
        return res.status(404).json({ message: 'No data available for this coin.' });
      }
      
      // Extract prices
      const prices = cryptoRecords.map(record => record.price);
  
      // Calculate mean
      const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  
      // Calculate variance
      const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  
      // Calculate standard deviation
      const standardDeviation = Math.sqrt(variance);
  
      // Respond with the deviation
      return res.json({ 
        coin: coin,
        deviation: standardDeviation.toFixed(2),
      });
    } catch (error) {
      console.error('Error fetching deviation:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { getLatestCryptoStats, getCryptoDeviation };
