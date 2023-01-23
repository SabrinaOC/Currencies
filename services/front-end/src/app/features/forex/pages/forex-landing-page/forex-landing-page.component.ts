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
    },
    {
      name: 'Australian Dollar', 
      code: 'AUD',
    },
    {
      name: 'British Pound Sterling',
      code: 'GBP',
    },
    {
      name: 'Japanese Yen',
      code: 'JPY',
    },
    {
      name: 'New Zealand Dollar',
      code: 'NZD',
    }
];

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
    this.subscriptions = [];
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
