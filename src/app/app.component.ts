/*********************************************************************************
 *  WEB422 – Assignment 05
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Brent Snow Student ID: 102354206  Date: 2021-11-22 (extension approved)
 *
 ********************************************************************************/

import { Component } from '@angular/core';
import { NavigationStart, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  token: any | null = null;
  title = 'web422-a6';
  searchString: string = '';

  constructor(private router: Router, private _route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  handleSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }
}
