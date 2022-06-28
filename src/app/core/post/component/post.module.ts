import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostRoutingModule } from "./post-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ApiService } from "../../services/api.service";
import { CreateComponent } from "./create/create.component";
import { IndexComponent } from "./index/index.component";
import { ViewComponent } from "./view/view.component";





@NgModule({
  declarations: [CreateComponent,IndexComponent,ViewComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,RouterModule, SharedModule,PostRoutingModule,

  ],
  providers: [ApiService],
})
export class PostModule {}
