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
    const response = `BTC: ${btc} | ETH: ${eth}`;
    res.send(response);
  } catch (error) {
    console.log('Error details:', error.message, error.response ? error.response.data : 'No response data');
    res.status(500).send('Error fetching prices');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));