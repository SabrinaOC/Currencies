// IMPLEMENT YOUR SOLUTION HERE!!
 import * as mongoose from "mongoose";
var FOREX_API_KEY = 'B9U2J4UKZTMRB030';
var currenciesAvailable = ['UsD', 'AUD','GBP', 'JPY', 'NZD']
var generalIndexFollowUP: number = -1;
const forexSchema = new mongoose.Schema(
    {
      fromCurrencyCode: String,
      fromCurrencyName: String,
      toCurrencyCode: String,
      toCurrencyName: String,
      exchangeRate: Number,
      bidPrice: Number,
      askPrice: Number
    },
    {
      timestamps: true,
    }
  );

  const Forex = mongoose.model("Forex", forexSchema)


export const retrieveData = () => {
    "Fetching...".concat("DATA!");
    forexDataRetrieval()
}

/**
 * 
 */
function forexDataRetrieval() {
    currenciesAvailable.forEach((currencyCode) => {
        forexServiceCall(currencyCode);
    });
}

/**
 * 
 * @param currency 
 */
function forexServiceCall(currency: string) {
    var url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currency}&to_currency=EuR&apikey=${FOREX_API_KEY}`;
    fetch(`${url}`,
        {headers: {'User-Agent': 'request'}, method: 'GET'})
        .then(response => response.json())
        .then(data => {
            saveServiceResIntoSchema(data);
        })
        .catch(err => console.log('error fetching forex: ', err))
}

/**
 * 
 * @param resService 
 */
async function saveServiceResIntoSchema(resService: any) {
    let forexData = resService['Realtime Currency Exchange Rate']
    console.log('DATA EN SERVICIO', forexData)
    Forex.create([{
        fromCurrencyCode: forexData['1. From_Currency Code'],
        fromCurrencyName: forexData['2. From_Currency Name'],
        toCurrencyCode: forexData['3. To_Currency Code'],
        toCurrencyName: forexData['4. To_Currency Name'],
        exchangeRate: parseFloat(forexData['5. Exchange Rate']),
        bidPrice: parseFloat(forexData['8. Bid Price']),
        askPrice: parseFloat(forexData['9. Ask Price'])
    }]
    ).then(data => {
      // console.log('resultado de la promesa MONGO: ', data)
      generalIndexFollowUP++;
      console.log('indice ', generalIndexFollowUP)
      if(generalIndexFollowUP === currenciesAvailable.length){//process finishes after last insert
            console.log("Executing service...");
          process.exit(0)
      }
    })
  }
  

