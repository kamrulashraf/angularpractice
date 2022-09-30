import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShopplingListService } from '../../Services/shopping-list.service';
import { RecipeService } from '../../Services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppState from "../../app.reducer";
import * as ShoppingAction from '../../shopping-list/store/shopping-list.action'
import { map, switchMap } from 'rxjs';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  constructor(private slService : ShopplingListService,
    private recipeService : RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>
  ) { }
  
  recipeId!: number;
  recipeItem! : Recipe;
  // @Input() RecipeItem! : Recipe;

  ngOnInit(): void {
    // this.route.params.subscribe((param: Params) => {
    //   this.recipeId = +param['id'];
    //   this.store.select('recipes').pipe(
    //     map(data => {
    //       return data.recipes.filter(x => x.id == this.recipeId); 
    //     })
    //   )
    //   .subscribe( recipe => {
    //     this.recipeItem = recipe[0];
    //   });
    // })

    // rxjs systax
    this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap( id => {
        this.recipeId = id;
        return this.store.select('recipes');
      }),
      map( recipes => {
        return recipes.recipes.filter( x=> x.id == this.recipeId)[0];
      })
    ).subscribe( recipe => {
      this.recipeItem = recipe;
    })
  }

  addIngToShoppingList(){
    // this.slService.addIngrediants(this.recipeItem.ingredients);
    this.store.dispatch(new ShoppingAction.AddIngredients(this.recipeItem.ingredients));
  }

  onEditRecipe(){
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.recipeId, 'edit'], {relativeTo: this.route});

  }
}
