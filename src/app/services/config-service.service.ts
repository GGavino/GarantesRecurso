import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/logo/logo.json'; // Localização do seu arquivo JSON

  constructor(private http: HttpClient) { }

  getConfig(): Observable<any> {
    return this.http.get(this.configUrl);
  }
}