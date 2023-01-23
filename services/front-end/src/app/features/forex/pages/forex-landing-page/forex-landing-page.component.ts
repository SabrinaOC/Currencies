import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private currenciesService : CurrenciesService) { }

  ngOnInit(): void {
    this.getAllSubscriptions();
    setInterval(() => {
      console.log('INTERVALO RECAGA DATOS');
      this.getAllSubscriptions();
    }, 300000)
    // this.subscriptions = []
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

  checkIfPossibleSubscription(selection: string) : boolean{
    console.log(this.subscriptions);
    for(let i = 0; i < this.subscriptions.length; i++){
      if(this.subscriptions[i]._code === selection){
        console.log('divisa ya added')
        return false;
      }
    }
    return true;
  }

  /**
   * 
   * @param selectedCurrency 
   */
  addNewCurrency(selectedCurrency?: string) {
    console.log('selectedCurrency param:', selectedCurrency);
    
    if(selectedCurrency){
      this.newSelectedCurrency = selectedCurrency;
    }
    console.log('entra en addNewCurrency')
    this.currenciesService.subsribeToCurrency(this.newSelectedCurrency).subscribe(res => {
      console.log('respuesta de la API: ', res)
      //refresh data shown
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
      console.log('respuesta de la API: ', res)
      //refresh data shown
      this.getAllSubscriptions();
    })
  }

  /**
   * 
   */
  getAllSubscriptions(){
    this.currenciesService.getAllCurrrenciesSubscribed().subscribe(res => {
      this.subscriptions = res.data;
      console.log('subscripciones: ', this.subscriptions)
      if(this.subscriptions.length > 0){
        this.getCurrentValue();
      }
    })
  }

  /**
   * 
   */
  getCurrentValue() {
    let dateC : Date;
    let dateH : Date;
    for (const sub of this.subscriptions){
      this.currenciesService.getCurrentValueCurrency(sub._code).subscribe(res => {
        sub.currentForex = res.data;
        dateC = sub.currentForex._createdAt;
        sub.currentForex._createdAt = dateC.getHours() + 1;
        console.log(res)
      })

      this.currenciesService.getYesterdayValueCurrency(sub._code).subscribe(res => {
        sub.historyForex = res.data;
        dateH = sub.historyForex._createdAt;
        sub.historyForex._createdAt = dateH.getHours() + 1;
        console.log('history', res.data)
      })
    }
  }

}
