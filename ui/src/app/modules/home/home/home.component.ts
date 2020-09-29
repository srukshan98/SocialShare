import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActiveUserConfigService } from './../../../services/api/active-user-config.service';
import { Component, OnInit } from '@angular/core';

enum LoginType {
  Manual,
  Twitter,

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
    private router: Router

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.type === 'twitter') {
        this.type = LoginType.Twitter;
      }
      this.authenticate();
    });
  }
  authenticate() {
    if (this.type === LoginType.Manual && this.activeUserService.activeUser) {
       return;
    }
    if (this.type === LoginType.Twitter && this.activeUserService.TwitterUser) {
       return;
    }
    this.router.navigate(['/login']);
  }

}
