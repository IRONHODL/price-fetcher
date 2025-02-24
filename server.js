{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww30040\viewh16620\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const axios = require('axios');\
const app = express();\
const port = process.env.PORT || 3000;\
\
app.get('/prices', async (req, res) => \{\
  try \{\
    // Fetch crypto prices from CoinGecko\
    const cryptoRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');\
    const btc = cryptoRes.data.bitcoin.usd;\
    const eth = cryptoRes.data.ethereum.usd;\
\
    // Fetch stock price from Alpha Vantage\
    const stockRes = await axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=B0PS0FXDOC3RZV62');\
    const sp500 = stockRes.data['Global Quote']['05. price'];\
\
    // Send plain text response\
    const response = `BTC: $\{btc\} | ETH: $\{eth\} | SP500: $\{sp500\}`;\
    res.send(response);\
  \} catch (error) \{\
    res.status(500).send('Error fetching prices');\
  \}\
\});\
\
app.listen(port, () => console.log(`Server running on port $\{port\}`));}