import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredients } from '../shared/ingredients.model';

@Injectable()
export class RecipeService{
    recipes : Recipe[] = [
        new Recipe( 1, "Burger",
          "Offer is on goind. Buy one get one. Double chese burger.",
          "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          [new Ingredients('Meet', 1), new Ingredients('Chese', 2)]
          ),
        new Recipe(2, "Pizza",
          "Family size pizza chese pizza with extra chese.",
          "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          [new Ingredients('Meet', 1), new Ingredients('Bread', 1)]
        ),
    ];

    
    SelectedRecipe =  new EventEmitter<Recipe>();
    getRecipe(){
      return this.recipes.slice();
    }

    getRecipeById(id: number){
      return this.recipes.filter(x => x.id == id).slice()[0];
    }
}