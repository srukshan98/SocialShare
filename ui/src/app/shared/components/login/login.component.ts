import { ActiveUserConfigService } from './../../../services/api/active-user-config.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private activeUserService: ActiveUserConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.activeUserService.TwitterUser) {
      this.router.navigate(['/home', 'twitter']);
    } else if (this.activeUserService.activeUser) {
      this.router.navigate(['/home']);
    }
  }

}
