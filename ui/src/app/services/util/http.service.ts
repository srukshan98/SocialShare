import { ActiveUserConfigService } from './../api/active-user-config.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private activeUser: ActiveUserConfigService
  ) { }

  post(
    url: string,
    body: any,
    header: any = { 'content-Type': 'application/json' }
  ): Observable<any> {
    return this.http.post(url, body, this.createHeader2(header));
  }

  get(
    url: string,
    header: any = { 'content-Type': 'application/json' }
  ): Observable<any> {
    return this.http.get(url, this.createHeader2(header));
  }

  upload(url: string, body: any, header: any = {}): Observable<any> {
    return this.http.post(url, body, this.createHeader2(header));

  }

  /**
   * No default header assigned
   * @param url api url
   * @param headers any header{}
   */
  getTwitter(url: string): Observable<any> {
    return this.http.get(url, this.createTwitterHeader());
  }

  getNoAuth(url: string): Observable<any> {
    return this.http.get(url);
  }

  /**
   * No default header assigned
   * @param url api url
   * @param body message payload
   * @param headers any header{}
   */
  post2(url: string, body: any, headers: any): Observable<any> {
    return this.http.post(url, body, this.createHeader2(headers));
  }

  private createHeader2(headers: any): any {
    headers = headers || {};
    let r1 = {
      Authorization: `Bearer ${this.authService.getAuthToken()}`
    };
    let x = { ...r1, ...headers };

    return {
      headers: new HttpHeaders(x)
    };
  }

  private createTwitterHeader(): any {
    let r1 = {
      'x-twitter-access-token': this.activeUser.TwitterUser.OAuthToken,
      'x-twitter-access-token-secret': this.activeUser.TwitterUser.OAuthTokenSecret,
    };
    let x = { ...r1 };

    return {
      headers: new HttpHeaders(x)
    };
  }
}
