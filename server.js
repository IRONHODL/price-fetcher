const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/prices', async (req, res) => {
  try {
    console.log('Fetching CoinGecko...');
    const cryptoRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    console.log('CoinGecko success:', cryptoRes.data);
    const btc = cryptoRes.data.bitcoin.usd;
    const eth = cryptoRes.data.ethereum.usd;
    console.log('Fetching Alpha Vantage...');
    const stockRes = await axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=B0PS0FXDOC3RZV62');
    console.log('Alpha Vantage success:', stockRes.data);
    const sp500 = stockRes.data['Global Quote']['05. price'];
    const response = `BTC: ${btc} | ETH: ${eth} | SP500: ${sp500}`;
    res.send(response);
  } catch (error) {
    console.log('Error details:', error.message, error.response ? error.response.data : 'No response data');
    res.status(500).send('Error fetching prices');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));