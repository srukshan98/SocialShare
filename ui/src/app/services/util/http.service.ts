import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) {}

  get(url: string, config: any = { 'content-Type': 'application/json' }): Observable<any> {
    return this.http.get(url, config);
  }
}
