import { Action } from "@ngrx/store";
import { Ingredients } from '../../shared/ingredients.model';


export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT_ING = 'START_EDIT_ING';
export const END_EDIT_ING = 'END_EDIT_ING';




export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload: Ingredients) { }
}

export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload: Ingredients[]) { }
}

export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredients) { }
}

export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
}

export class StartEditIng implements Action{
    readonly type: string = START_EDIT_ING;
    constructor(public payload: number){}
}

export class EndEdtiIng implements Action{
    readonly type: string = END_EDIT_ING;

}

export type ShoppingListActions = AddIngredient 
    | AddIngredients 
    | UpdateIngredient 
    | DeleteIngredient
    | StartEditIng
    | EndEdtiIng
