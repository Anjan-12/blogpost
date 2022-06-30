import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  notAllowedNames = ['anjan'];
  loginForm: FormGroup;
  errorMessage: '' | undefined;
  token: string = '';
  isValidFormSubmitted = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
    this.loginForm = this.formbuilder.group({
      username: new FormControl('', [
        Validators.required,
        this.NaNames.bind(this),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  save() {
    console.log(this.loginForm);

    this.isValidFormSubmitted = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.loginService.validateUser(this.loginForm.value).subscribe({
      next: (res) => {
        this.token = res.token;
        TokenService.setAccessToken(this.token);
        console.log('bhayo');

        //   this.router.navigateByUrl('/post/index');
      },
      error: (res) => (this.errorMessage = res.error.message),
    });
  }
  NaNames(control: FormControl) {
    if (this.notAllowedNames.indexOf(control.value) !== -1) {
      return { nameIsNotAllowed: true };
    }
    return null;
  }
}
