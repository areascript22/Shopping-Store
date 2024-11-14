import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
