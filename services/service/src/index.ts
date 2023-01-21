import * as path from "path";
import * as mongoose from "mongoose";
import { retrieveData } from "./retrieveData";

// [DB Connection]

declare var MONGODB_URI: string;

/**
 * connectToDatabase
 * Configures the global MongoDB connection based on the provided secrets.
 *
 * @returns Promise<string>
 */
async function connectToDatabase(connectionUri: string) {
  //connectionUri = 'mongodb://localhost:27017/home-assignment-db';
  console.log('conectando a ', connectionUri);
  
  return new Promise((resolve, reject) => {
    // From mongoose@6.x.x onwards useNewUrlParser, useUnifiedTopology,
    // useCreateIndex are deprecated and default to true
    mongoose
      .connect(connectionUri)
      .then(() => resolve(connectionUri))
      .catch((error: any) => {
        console.log(error);
        reject(`${connectionUri}: ${error}`);
      });
  });
}
connectToDatabase(MONGODB_URI);

// [Script execution]
const retrievedData = retrieveData().then(res => {
  console.log('RES FOREX SER: ', res);
  console.log("Executing service...");
  process.exit(0)
});
//console.debug(retrievedData);


// fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=B9U2J4UKZTMRB030',{headers: {'User-Agent': 'request'}, method: 'GET'})
// .then(response => response.json())
// .then(data => {
//   console.log(data, 'SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
//   console.log("Executing service...");
//   process.exit(0)
// })




;
