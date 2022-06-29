import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [  SharedModule, AuthRoutingModule],
})
export class AuthModule {}
