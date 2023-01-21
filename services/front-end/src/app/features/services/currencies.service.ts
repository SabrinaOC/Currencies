import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getAllCurrrenciesSubscribed(): Observable<any> {
    const url = `${this.apiUrl}/api/currencies`;
    return this.http.get(url, {});
  }
}
