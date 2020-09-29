import { ActiveUserConfigService } from './../../../../services/api/active-user-config.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private activeUserService: ActiveUserConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.activeUserService.logout();
    this.router.navigate(['/login']);
  }

}
