import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingComponent],
  imports: [CommonModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
})
export class SharedModule {}
