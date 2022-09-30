import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {Store} from "@ngrx/store"
import { catchError, EMPTY, map, mergeMap, switchMap } from "rxjs";

import { RecipeService } from '../../Services/recipe.service';
import { getRecipeAPI, recipeAPISuccess, onUpdateRecipe, updateRecipe } from './recipe.action';
import { DataService } from '../../data.service';
import { Recipe } from "../recipe.model";

@Injectable()

export class recipeEffect{
    loadAllRecipe$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getRecipeAPI),
        switchMap(() => this.dataService.getRecipeList().pipe(
          map(data => recipeAPISuccess({recipes: data})),
          catchError(() => EMPTY)
        ))
      )
    );

    updateRecipe$ = createEffect( () => 
          this.actions$.pipe(
            ofType(updateRecipe),
            switchMap( (data) =>(this.dataService.updateRecipe(data.recipe)
              .pipe(
                map( data => onUpdateRecipe({recipe: data})),
                catchError( () => EMPTY)
              )
            ))
          )
    )


     constructor(
        private actions$: Actions,
        private recipeService: RecipeService,
        private dataService: DataService,
        private store: Store
      ) {}

}