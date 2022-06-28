import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  token: string = '';
  constructor(
    private loginService: LoginService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  save() {
    this.loginService.validateUser(this.loginForm.value).subscribe({
      next: (res) => {
        this.token = res.token;
        TokenService.setAccessToken(this.token);
        console.log('bhayo');

        this.router.navigateByUrl("hffix");
      },
      error: (res) => console.log('An error occurred: ', res),
    });
  }
}
