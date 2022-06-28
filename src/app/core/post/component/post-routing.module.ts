import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ViewComponent,
  CreateComponent,
  IndexComponent,
} from '/home/anjan/Documents/project/Blog1/src/app/core/post/component';

const routes: Routes = [

  { path: 'index', component: IndexComponent },
  { path: 'view/:postId', component: ViewComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:postId', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
