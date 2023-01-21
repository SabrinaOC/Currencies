// IMPLEMENT YOUR SOLUTION HERE!!
var FOREX_API_KEY = 'B9U2J4UKZTMRB030';
export const retrieveData = (fromCurrency: string) : Promise<any> => {
    "Fetching...".concat("DATA!");
    // 'use strict';
    //  var request = require('request');
    // //hay que hacer un seguimiento de cada una de las divisas a las que esta suscrito
    // //Implement recurrent data retrieval for each of the followed currencies
    // var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=B9U2J4UKZTMRB030';
    var url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=EuR&apikey=${FOREX_API_KEY}`;
    

    return new Promise((resolve, reject) => {

        fetch(`${url}`,
        {headers: {'User-Agent': 'request'}, method: 'GET'})
        .then(response => response.json())
        .then(data => resolve({data}))
        .catch(err => {reject({error: err})})
    })
}
