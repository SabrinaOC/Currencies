import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrenciesService } from 'src/app/features/services/currencies.service';

@Component({
  selector: 'app-forex-landing-page',
  templateUrl: './forex-landing-page.component.html',
  styleUrls: ['./forex-landing-page.component.scss']
})
export class ForexLandingPageComponent implements OnInit {
  divisas = [
    {
      name: 'United States Dollar',
      code: 'USD',
      currentForex: {},
      historyForex: {}
    },
    // {
    //   name: 'Argentine Peso',
    //   code: 'ARS',
    //   forex: null
    // },
    {
      name: 'British Pound Sterling',
      code: 'GBP',
      currentForex: {},
      historyForex: {}
    },
    {
      name: 'Colombian Peso',
      code: 'COP',
      currentForex: {},
      historyForex: {}
    },
    {
      name: 'Chinese Yuan',
      code: 'CNY',
      currentForex: {},
      historyForex: {}
    }
];
  newSelectedCurrency: string;
  subscriptions: any;
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
  }

  /**
   * 
   * @param event 
   */
  currencyChanged(event) {
    console.log('CAMBIO SELECT: ', event.value)
    this.newSelectedCurrency = event.value;
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
    for (const sub of this.subscriptions){
      this.currenciesService.getCurrentValueCurrency(sub._code).subscribe(res => {
        sub.currentForex = res.data;
        console.log(res)
      })

      this.currenciesService.getYesterdayValueCurrency(sub._code).subscribe(res => {
        sub.historyForex = res.data;
        console.log('history', res.data)
      })
    }
  }

}
