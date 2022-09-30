import { ActionReducerMap } from "@ngrx/store";
import { shoppingListReducer, ShoppingListState } from "./shopping-list/store/shopping-list.reducer";
import { recipeReducer, RecipeState } from './recipes/store/recipe.reducer';

export const rootReducer = {};

export interface AppState {
    shoppingList: ShoppingListState,
    recipes: RecipeState
};

export const reducers: ActionReducerMap<AppState, any> = {
    shoppingList: shoppingListReducer,
    recipes: recipeReducer
}