import { HttpService } from '../util/http.service';
import { environment } from '../../../environments/environment';
import { ConfigResponse } from '../../models/response/config-response.model';
import { ResponseModel } from '../../models/response/response.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvConfigService {

  private config: ConfigResponse = null;

  constructor(
    private http: HttpService
  ) {}

  getConfigurations(): Observable<ResponseModel<ConfigResponse>> {
    if (this.config) {
      return of (new ResponseModel(this.config));
    }

    return this.http.get(`${environment.apiURL}/configuration/`).pipe(tap((a: ResponseModel<ConfigResponse>) => {
      if (a && a.IsSuccessful) {
        this.config = a.Body;
      }
    }));
  }
}
