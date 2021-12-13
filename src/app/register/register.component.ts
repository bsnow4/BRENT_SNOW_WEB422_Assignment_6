import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../types/RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public success: boolean = false;
  public loading: boolean = false;
  public warning: string | null = null;
  public registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const { username, password, password2 } = form.value;
    if (username && username !== '') {
      if (password && password !== '') {
        if (password === password2) {
          this.loading = true;
          this.auth.register(this.registerUser)
            .subscribe(
              (res) => {
                this.success = true;
                this.loading = false;
                this.warning = null;
              },
              (err) => {
                this.warning = err;
                this.loading = false;
              }
            );
        } else {
          this.warning = 'Passwords do not match';
        }
      } else {
        this.warning = 'Password is required';
      }
    } else {
      this.warning = 'Username is required';
    }
  }

}
