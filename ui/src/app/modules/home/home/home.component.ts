import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActiveUserConfigService } from './../../../services/api/active-user-config.service';
import { Component, OnInit } from '@angular/core';

enum LoginType {
  Manual,
  Twitter,
  Facebook
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  type: LoginType = LoginType.Manual;
  constructor(
    private activeUserService: ActiveUserConfigService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.type === 'twitter') {
        this.type = LoginType.Twitter;
      }
      if (params.type === 'facebook') {
        this.type = LoginType.Facebook;
      }
      this.authenticate();
    });
  }
  authenticate() {
    if (this.type === LoginType.Manual && this.activeUserService.activeUser) {
      return;
    }
    if (this.type === LoginType.Twitter && this.activeUserService.TwitterUser) {
      this.router.navigate(['twitter']);
      return;
    }
    if (this.type === LoginType.Facebook && this.activeUserService.FacebookUser) {
      this.router.navigate(['facebook']);
      return;
    }
    this.router.navigate(['/login']);
  }

}
