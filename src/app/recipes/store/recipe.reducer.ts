import { Recipe } from '../recipe.model';
import {createReducer, on} from '@ngrx/store'
import { onUpdateRecipe, recipeAPISuccess } from './recipe.action';

export interface RecipeState{
    recipes: Recipe[]
}
const intialState: RecipeState = {
    recipes : []
}


export const recipeReducer = createReducer(
    intialState,
    on(recipeAPISuccess, (state, action)=>({
            ...state,
            recipes: action.recipes
        })
    ),
    on(onUpdateRecipe, (state, action) => {
        var preRecipe = [...state.recipes];
        var index = preRecipe.findIndex( recipe => recipe.id == action.recipe.id);
        preRecipe[index]  = {...preRecipe[index], ...action.recipe};
        return {
            ...state,
            recipes: preRecipe
        }
    })
)