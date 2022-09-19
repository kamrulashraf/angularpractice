import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeHeaderComponent } from './recipes/recipe-header/recipe-header.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Recipe',
    pathMatch: 'full'
  },
  {
    path: 'Recipe',
    component: RecipesComponent,
    children:[
      { path: '',
        component: RecipeHeaderComponent,
        pathMatch: 'full'
      },
      {
        path:'new',
        component: RecipesEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService]
      },
      {
        path: ":id/edit",
        component: RecipesEditComponent
      }
    ]
  },
  {
    path: 'Shopping',
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
