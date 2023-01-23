// IMPLEMENT YOUR SOLUTION HERE!!
 import * as mongoose from "mongoose";
//  import { forkJoin } from 'rxjs';
var FOREX_API_KEY = 'B9U2J4UKZTMRB030';
var currenciesAvailable = ['UsD', 'AUD','GBP', 'JPY', 'NZD']
var generalIndexFollowUP: number = -1;
const forexSchema = new mongoose.Schema(
    {
      // _id: mongoose.Types.ObjectId,
      fromCurrencyCode: String,
      fromCurrencyName: String,
      toCurrencyCode: String,
      toCurrencyName: String,
      exchangeRate: Number,
      // date: String,
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
    // var url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=EuR&apikey=${FOREX_API_KEY}`;
    forexDataRetrieval()

}

/**
 * 
 */
function forexDataRetrieval() {
    currenciesAvailable.forEach((currencyCode) => {
        forexServiceCall(currencyCode);
    })



    // const $dolar = forexServiceCall('UsD');
    // const $pound = forexServiceCall('GBP');

    // forkJoin([$dolar, $pound]).subscribe(([dolar, pound]: any) => {
    //     console.log('DOLAR = ', dolar)
    //     console.log('POUND = ', pound)
        
  
    //   }, err => {
    //     this.showError = true;
    //   })
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
            console.log('RES SERVICE con CURRENCY ' , currency , ' = ', data)
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
      console.log('resultado de la promesa MONGO: ', data)
      generalIndexFollowUP++;
      console.log('indice ', generalIndexFollowUP)
      if(generalIndexFollowUP === currenciesAvailable.length){//process finishes after last insert
            console.log("Executing service...");
          process.exit(0)
      }
    })
  }
  

