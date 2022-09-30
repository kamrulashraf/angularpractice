import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeHeaderComponent } from './recipes/recipe-header/recipe-header.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { SigninRedirectCallbackComponent } from './auththentication/signin-redirect-callback/signin-redirect-callback.component';
import { AuthGuard } from './auththentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Recipe',
    pathMatch: 'full'
  },
  {
    path: 'recipe',
    loadChildren: () => import('./recipes/recipes.component').then(m => m.RecipesComponent),
  },
  {
    path: 'signin-callback',
    component: SigninRedirectCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
