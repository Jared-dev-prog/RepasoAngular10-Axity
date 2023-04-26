import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse, LoginRequest } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.formLogin = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  login() {
    const email = this.formLogin.get('email').value;
    const password = this.formLogin.get('password').value;

    console.log(email, password);

    const data = new LoginRequest();
    data.email = email;
    data.password = password;

    console.log(data);

    this.loginService.login(data).subscribe({
      next: (data) => {
        if (data.token) {
          this.router.navigate(['list']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
