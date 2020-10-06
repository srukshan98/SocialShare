import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FacebookAuthModel } from './../../../../models/facebook-auth.model';
import { ActiveUserConfigService } from './../../../../services/api/active-user-config.service';

@Component({
  selector: 'app-facebook-callback',
  templateUrl: './facebook-callback.component.html',
  styleUrls: ['./facebook-callback.component.scss']
})
export class FacebookCallbackComponent implements OnInit {
  params: FacebookAuthModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activeUserService: ActiveUserConfigService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.params = FacebookAuthModel.fromParam(params);
      if (this.params.AccessToken) {
        this.activeUserService.FacebookUser = this.params;
        this.router.navigate(['/home/facebook']);
      } else {
        this.getAccessToken();
      }
    });
  }

  getAccessToken() {
    window.location.href = 'https://127.0.0.1:3000/auth/facebook';
  }
}
