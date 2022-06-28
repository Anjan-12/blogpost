import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/component/login/login.component';
import { HFfixComponent } from './hffix/hffix.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'post',
    loadChildren: () =>
      import(
        'src/app/core/post/component/post.module'
      ).then((m) => m.PostModule),
  },
  { path: 'hffix', component: HFfixComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
