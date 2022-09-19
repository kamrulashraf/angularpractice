import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../Services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe! : Recipe;
  selectedRecipeID! : number;
  constructor(private recipeService : RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipeSelectEvent.subscribe((id) => {
      this.selectedRecipeID = id;
    })
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
