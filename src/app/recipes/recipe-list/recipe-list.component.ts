import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../Services/recipe.service';
import { Store } from '@ngrx/store';
import { getRecipeAPI } from '../store/recipe.action';
import { Observable } from 'rxjs';
import { AppState } from '../../app.reducer';
import { RecipeState } from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipe : EventEmitter<Recipe> = new EventEmitter<Recipe>();
  // recipes! : Recipe[];
  recipes! : Observable<RecipeState>;

  constructor(private recipeService : RecipeService,
    private store: Store<AppState>  
  ) { }

  ngOnInit(): void {

    // this.store.dispatch(getRecipeAPI());

    this.recipes = this.store.select('recipes');

    // this.store.select('recipes').subscribe(data => {
    // })

    // this.recipeService.recipeChanges.subscribe( recipes => {
    //   this.recipes = recipes;
    // })
  }

}
