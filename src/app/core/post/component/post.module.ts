import { NgModule } from "@angular/core";
import { PostRoutingModule } from "./post-routing.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ApiService } from "../../services/api.service";
import { CreateComponent } from "./create/create.component";
import { IndexComponent } from "./index/index.component";
import { ViewComponent } from "./view/view.component";





@NgModule({
  declarations: [CreateComponent,IndexComponent,ViewComponent],
  imports: [
    RouterModule, SharedModule,PostRoutingModule,

  ],
  exports: [

  ],
  providers: [ApiService],
})
export class PostModule {}
