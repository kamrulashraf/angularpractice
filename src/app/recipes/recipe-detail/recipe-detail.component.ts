import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShopplingListService } from '../../Services/shopping-list.service';
import { RecipeService } from '../../Services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  constructor(private slService : ShopplingListService,
    private recipeService : RecipeService,
    private route: ActivatedRoute,
    private router: Router  
  ) { }
  
  recipeId!: number;
  recipeItem! : Recipe;
  // @Input() RecipeItem! : Recipe;

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.recipeId = +param['id'];
      this.recipeItem = this.recipeService.getRecipeById(this.recipeId);
    })
  }

  addIngToShoppingList(){
    this.slService.addIngrediants(this.recipeItem.ingredients);
  }

  onEditRecipe(){
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.recipeId, 'edit'], {relativeTo: this.route});

  }
}
