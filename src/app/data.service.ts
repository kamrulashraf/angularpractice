import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { RecipeService } from './Services/recipe.service';
import { Recipe } from './recipes/recipe.model';
import { tap } from "rxjs";

@Injectable({providedIn: "root"})
export class DataService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) {}

    getRecipeList(){
        return this.http.get<Recipe[]>("https://localhost:7006/api/Recipe")
            .pipe(
                tap( data =>{
                    this.recipeService.setRecipe(data);
                })
            );
    }

}