const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/prices', async (req, res) => {
  try {
    const cryptoRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    const btc = cryptoRes.data.bitcoin.usd;
    const eth = cryptoRes.data.ethereum.usd;
    const stockRes = await axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=B0PS0FXDOC3RZV62');
    const sp500 = stockRes.data['Global Quote']['05. price'];
    const response = `BTC: ${btc} | ETH: ${eth} | SP500: ${sp500}`;
    res.send(response);
  } catch (error) {
    res.status(500).send('Error fetching prices');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));