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
      name: 'Euro',
      code: 'EuR'
    },
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
    }
    // {
    //   name: 
    //   code:
    // }
    // {
    //   name: 
    //   code:
    // }
]
  form = new FormGroup ({
    divisa: new FormControl()
  })
  constructor(private currenciesService : CurrenciesService) { }

  ngOnInit(): void {
    
  }

  getAllSubscriptions(){
    this.currenciesService.getAllCurrrenciesSubscribed().subscribe(res => {
      console.log('respuesta de la API: ', res)
    })
  }

}
