import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  errorMessage: '' | undefined;
  token: string = '';
  constructor(
    private loginService: LoginService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
    this.loginForm = this.formbuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  save() {
    this.loginService.validateUser(this.loginForm.value).subscribe({
      next: (res) => {
        this.token = res.token;
        TokenService.setAccessToken(this.token);
        console.log('bhayo');

      //   this.router.navigateByUrl('/post/index');
      },
      error: (res) => this.errorMessage = res.error.message,


    });
  }
}
