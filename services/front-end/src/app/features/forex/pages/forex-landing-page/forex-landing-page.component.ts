import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrenciesService } from 'src/app/features/services/currencies.service';

@Component({
  selector: 'app-forex-landing-page',
  templateUrl: './forex-landing-page.component.html',
  styleUrls: ['./forex-landing-page.component.scss']
})
export class ForexLandingPageComponent implements OnInit {
  divisas = [ //'UsD', 'AUD','GBP', 'JPY', 'NZD' API allows just 5 per minute 
    {
      name: 'United States Dollar',
      code: 'USD',
      // currentForex: {},
      // historyForex: {}
    },
    {
      name: 'Australian Dollar', 
      code: 'AUD',
      // currentForex: {},
      // historyForex: {}
    },
    {
      name: 'British Pound Sterling',
      code: 'GBP',
      // currentForex: {},
      // historyForex: {}
    },
    {
      name: 'Japanese Yen',
      code: 'JPY',
      // currentForex: {},
      // historyForex: {}
    },
    {
      name: 'New Zealand Dollar',
      code: 'NZD',
      // currentForex: {},
      // historyForex: {}
    },
    // {
    //   name: 'Chinese Yuan',
    //   code: 'CNY',
    //   currentForex: {},
    //   historyForex: {}
    // }
];

// variables para no tirar de servicios y dise;ar front//
current = {
  "_id": "63ce7dd0f158ccfec4b232fd",
  "_fromCurrencyCode": "GBP",
  "_fromCurrencyName": "British Pound Sterling",
  "_toCurrencyCode": "EUR",
  "_toCurrencyName": "Euro",
  "_exchangeRate": 1.13676,
  "_bidPrice": 1.136716,
  "_askPrice": 1.136814,
  "_createdAt": "2023-01-23T12:30:08.265Z"
}

history = {
  "_id": "63ce700a1935f695e9d182c6",
  "_fromCurrencyCode": "USD",
  "_fromCurrencyName": "United States Dollar",
  "_toCurrencyCode": "EUR",
  "_toCurrencyName": "Euro",
  "_exchangeRate": 0.5,
  "_bidPrice": 0.8,
  "_askPrice": 0.91791,
  "_createdAt": "2023-01-22T23:20:08.110Z"
}

/// FIHN
  newSelectedCurrency: string;
  subscriptions : any;
  form = new FormGroup ({
    divisa: new FormControl()
  })
  constructor(private currenciesService : CurrenciesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllSubscriptions();
    setInterval(() => {
      console.log('INTERVALO RECAGA DATOS');
      this.getAllSubscriptions();
    }, 300000)
  }

  /**
   * 
   * @param event 
   */
  currencyChanged(event) {
    if(this.checkIfPossibleSubscription(event.value)){
      this.newSelectedCurrency = event.value;
    }
  }

  /**
   * 
   * @param selection 
   * @returns 
   */
  checkIfPossibleSubscription(selection: string) : boolean{
    for(let i = 0; i < this.subscriptions.length; i++){
      if(this.subscriptions[i]._code === selection){
        this.openSnackBar('Currency already added', 'Close')
        return false;
      }
    }
    return true;
  }

  /**
   * 
   * @param message 
   * @param action 
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  /**
   * 
   * @param selectedCurrency 
   */
  addNewCurrency(selectedCurrency?: string) {
    if(selectedCurrency){
      this.newSelectedCurrency = selectedCurrency;
    }
    this.currenciesService.subsribeToCurrency(this.newSelectedCurrency).subscribe(res => {
      //refresh shown data 
      this.getAllSubscriptions();
      this.form.reset();
    })
  }

  /**
   * 
   * @param currencyCode 
   */
  removeCurrency(currencyCode: string) {
    this.currenciesService.unsubsribeToCurrency(currencyCode).subscribe(res => {
      //refresh shown data 
      this.getAllSubscriptions();
    })
  }

  /**
   * 
   */
  getAllSubscriptions(){
    this.currenciesService.getAllCurrrenciesSubscribed().subscribe(res => {
      this.subscriptions = res.data;
      if(this.subscriptions.length > 0){
        this.getCurrentValue();
      }
    })
  }

  /**
   * 
   */
  getCurrentValue() {
    for (const sub of this.subscriptions){
      this.currenciesService.getCurrentValueCurrency(sub._code).subscribe(res => {
        sub.currentForex = res.data;
      })

      this.currenciesService.getYesterdayValueCurrency(sub._code).subscribe(res => {
        sub.historyForex = res.data;
      })
    }
  }

}
