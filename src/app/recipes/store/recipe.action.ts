import {createAction, props} from '@ngrx/store'
import { Recipe } from '../recipe.model';

export const ACTIONS = {
    GET_RECIPE_LIST : '[recipe] get recipe',
    GET_RECIPE_SUCCESS: '[recipe] get recipe success',
}

export const getRecipeAPI = createAction(
    ACTIONS.GET_RECIPE_LIST,
)

export const recipeAPISuccess = createAction(
    ACTIONS.GET_RECIPE_SUCCESS,
    props<{ recipes: Recipe[]}>()
)

export const deleteRecipe = createAction(
    '[recipe] delete recipe',
    props<{id: number}>()
)

export const onDeleteSuccess = createAction(
    '[recipe] on delete success'
)

export const updateRecipe = createAction(
    '[recipe] update recipe',
    props<{recipe: Recipe}>()
)

export const onUpdateRecipe = createAction(
    '[recipe] on update recipe',
    props<{ recipe: Recipe}>()
)