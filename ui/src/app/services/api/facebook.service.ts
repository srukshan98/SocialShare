import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { ResponseModel } from './../../models/response/response.model';
import { HttpService } from './../util/http.service';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(
    private http: HttpService
  ) { }

  GetPosts(): Observable<ResponseModel<any>> {
    return this.http.getFacebook(`${environment.apiURL}/facebook/posts`);
  }
}
