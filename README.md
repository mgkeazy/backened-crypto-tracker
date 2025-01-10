Crypto Tracker API

A backend application to track cryptocurrency prices, store data, and provide statistical analysis for coins like Bitcoin, Ethereum, and Matic.

To check the stats of a particular coin, you can use this endpoint and replace the coin name in the URL: 
http://localhost:3000/api/crypto/stats?coin=<coin-name>.


To check the deviation of a particular coin, you can use this endpoint and replace the coin name in the URL: 
http://localhost:3000/api/crypto/deviation?coin=<coin-name>.


In the Hosting part: URL is : -> https://backened-crypto-tracker.onrender.com/

Stats Endpoint (api/crypto/stats?coin=<coin-name>):
For fetching the current price in USD, market cap in USD and 24 hour change of 3 cryptocurrencies use add (api/crypto/stats?coin=<coin-name>)

Deviation Endpoint (api/crypto/deviation?coin=<coin-name>):
For fetching deviation that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records
add api/crypto/deviation?coin=<coin-name>.
