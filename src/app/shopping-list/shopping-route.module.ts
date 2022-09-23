import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';

const routes = [{
  path: 'Shopping',
  component: ShoppingListComponent
}]

@NgModule({
  
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ShoppingRouteModule { }
