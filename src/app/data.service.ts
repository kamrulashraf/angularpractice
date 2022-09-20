import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http"
import { RecipeService } from './Services/recipe.service';
import { Recipe } from './recipes/recipe.model';
import { catchError, tap, throwError } from "rxjs";
import { AuthService } from './shared/services/auth.service';

@Injectable({providedIn: "root"})
export class DataService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    getRecipeList(){
        return this.http.get<Recipe[]>("https://localhost:7006/api/Recipe")
            .pipe(
                catchError(this.handleError),
                tap( data =>{
                    this.recipeService.setRecipe(data);
                })
            );
    }

    handleError(err: HttpErrorResponse){
        let errMsg = "An unknown error occured.";

        if(!err.error || !err.error.error){
            return throwError( () => errMsg);
        }
        else{
            let msg = err.error.message | err.error.error.message;
            return throwError( () => msg);
        }
    }

}