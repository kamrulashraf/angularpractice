import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth.guard';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipeHeaderComponent } from './recipe-header/recipe-header.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: 'Recipe',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: [RecipeResolverService],
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
        // resolve: [RecipeResolverService]
      },
      {
        path: ":id/edit",
        component: RecipesEditComponent
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
