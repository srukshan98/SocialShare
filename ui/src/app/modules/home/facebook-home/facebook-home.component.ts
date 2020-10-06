import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookService } from '../../../services/api/facebook.service';
import { FacebookAuthModel } from './../../../models/facebook-auth.model';
import { ResponseModel } from '../../../models/response/response.model';
import { ActiveUserConfigService } from '../../../services/api/active-user-config.service';

@Component({
  selector: 'app-facebook-home',
  templateUrl: './facebook-home.component.html',
  styleUrls: ['./facebook-home.component.scss']
})
export class FacebookHomeComponent implements OnInit {
  user: FacebookAuthModel;
  posts: any[];

  constructor(
    private activeUserService: ActiveUserConfigService,
    private router: Router,
    private facebookService: FacebookService
  ) { }

  ngOnInit(): void {
    this.user = this.activeUserService.FacebookUser;

    this.facebookService.GetPosts().subscribe((res: ResponseModel<any[]>) => {
      if (res.IsSuccessful) {
        this.posts = res.Body;
      }
    });
    this.authenticate();
  }

  authenticate() {
    if (this.activeUserService.FacebookUser) {
      return;
    }
    this.router.navigate(['']);
  }

  gotoPost(post: any): void {
    window.open(post.link, '_blank');
  }
}
