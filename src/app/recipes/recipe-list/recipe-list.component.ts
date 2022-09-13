import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipe : EventEmitter<Recipe> = new EventEmitter<Recipe>();
  recipes! : Recipe[];
  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipe();
  }

  SelectRecipe(data: Recipe){
    console.log(data)
    // this.selectedRecipe.emit(data);
    this.recipeService.SelectedRecipe.emit(data);
  }

}
