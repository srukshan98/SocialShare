import { environment } from './../../../environments/environment';
import { ResponseModel } from './../../models/response/response.model';
import { HttpService } from './../util/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(
    private http: HttpService
  ) { }

  GetAccessToken(): Observable<ResponseModel<any>> {
    return this.http.get(`${environment.apiURL}/twitter/access-token`);
  }
}
