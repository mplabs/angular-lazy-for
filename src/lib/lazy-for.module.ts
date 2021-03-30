import { NgModule } from '@angular/core';
import { LazyForDirective } from './lazy-for.directive';

@NgModule({
  declarations: [LazyForDirective],
  exports: [LazyForDirective]
})
export class LazyForModule { }
