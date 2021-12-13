import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../types/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public warning: string | null = null;
  public loading: boolean = false;
  public user: User = {
    _id: null,
    userName: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const { username, password } = form.value;
    if (username && username !== '' && password && password !== '') {
      this.loading = true;
      this.auth.login(this.user)
        .subscribe(
          success => {
            if (this.auth.setToken(success.token)) {
              this.router.navigate(['/newReleases']);
            }
          },
          err => this.warning = err.error.message
        );
    }
  }

}
