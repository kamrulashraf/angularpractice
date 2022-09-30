import { Action } from "@ngrx/store";
import { Ingredients } from '../../shared/ingredients.model';
import * as ShoppingListAction from './shopping-list.action';
import { Params } from '@angular/router';
import { TypeofExpr } from "@angular/compiler";
import { ShoppingListActions, StartEditIng } from './shopping-list.action';

export interface ShoppingListState{
    ingrediantList: Ingredients[],
    editedIng: Ingredients| null,
    editedIndex: number
}

const initialState : ShoppingListState = {
    ingrediantList : [
        new Ingredients("Apple", 5),
        new Ingredients("Lemon", 7)
    ],
    editedIng: null,
    editedIndex: -1

};
export function shoppingListReducer(state = initialState,
    action: ShoppingListAction.ShoppingListActions): ShoppingListState {
    switch (action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            let addIngAction =  action as ShoppingListAction.AddIngredient;
            return {
                ...state,
                ingrediantList: [...state.ingrediantList, addIngAction.payload],
                editedIndex: -1,
                editedIng: null
            }
        case ShoppingListAction.ADD_INGREDIENTS:
            let addIngsAction = action as ShoppingListAction.AddIngredients;
            return {
                ...state,
                ingrediantList: [...state.ingrediantList, ...addIngsAction.payload]
            }
        case ShoppingListAction.UPDATE_INGREDIENT:
            let updateIng = <ShoppingListAction.UpdateIngredient> action;
            const ingItem = state.ingrediantList[state.editedIndex];
            
            const updatedIng = {
                ...ingItem,
                ...updateIng.payload
            };

            const updatedIngs = [...state.ingrediantList];
            updatedIngs[state.editedIndex] = updatedIng;

            return {
                ...state,
                ingrediantList: updatedIngs,
                editedIndex: -1,
                editedIng: null
            }
        case ShoppingListAction.DELETE_INGREDIENT:
            return {
                ...state,
                ingrediantList: state.ingrediantList.filter( (x, indx)=>{
                    return indx !=  state.editedIndex;
                }),
                editedIndex: -1,
                editedIng: null
            }

        case ShoppingListAction.START_EDIT_ING:
            let startEditAction = <ShoppingListAction.StartEditIng> action;
            return{
                ...state,
                editedIng: state.ingrediantList[startEditAction.payload],
                editedIndex: startEditAction.payload
            }

        case ShoppingListAction.END_EDIT_ING:
            return{
                ...state,
                editedIng: null,
                editedIndex: -1
            } 
        default:
            return {
                ...state
            }

    }
}