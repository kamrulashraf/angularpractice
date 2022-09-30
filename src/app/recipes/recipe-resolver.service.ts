import { Injectable } from "@angular/core"
import { Recipe } from './recipe.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map, Observable, take, switchMap, of } from 'rxjs';
import { DataService } from '../data.service';
import { Store } from '@ngrx/store';

import * as fromAppState from '../app.reducer'
import { getRecipeAPI, recipeAPISuccess } from './store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { RecipeState } from './store/recipe.reducer';
@Injectable({ providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataService : DataService, private store: Store<fromAppState.AppState>, private action$ : Actions){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | any  {
        // return this.dataService.getRecipeList();

        return this.store.select('recipes').pipe(
            map(recipeState => {
                return recipeState.recipes;
            }),
            switchMap(recipe =>{
                debugger
                if(recipe.length == 0){
                    this.store.dispatch(getRecipeAPI());
                    return this.action$.pipe(
                        ofType(recipeAPISuccess),
                        take(1)
                    )
                }
                else{
                    return of(recipe);
                }
            })
        )
    }

}