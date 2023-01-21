import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private apiUrl = '/api/';
  // private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  public getAllCurrrenciesSubscribed(): Observable<any> {
    const url = `${this.apiUrl}currencies`;
    return this.http.get(url, {});
  }

  /**
   * 
   * @param currencyCode 
   * @returns 
   */
  public subsribeToCurrency(currencyCode: string) {
    let body = {
        code: currencyCode,
        hasSubscription: true,
      }
    const url = `${this.apiUrl}currency`;
    return this.http.post(url, body, {});
  }

  /**
   * 
   * @param currencyCode 
   * @returns 
   */
  public unsubsribeToCurrency(currencyCode: string) {
    const url = `${this.apiUrl}currency/${currencyCode}`;
    return this.http.put(url, {});
  }
}
