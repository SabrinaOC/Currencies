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
    // {
    //   name: 'Euro',
    //   code: 'EuR'
    // },
    {
      name: 'United States Dollar',
      code: 'UsD'
    },
    {
      name: 'Argentine Peso',
      code: 'ARS'
    },
    {
      name: 'British Pound Sterling',
      code: 'GBP'
    },
    {
      name: 'Colombian Peso',
      code: 'COP'
    },
    {
      name: 'Chinese Yuan',
      code: 'CNY'
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
    })
  }

}
