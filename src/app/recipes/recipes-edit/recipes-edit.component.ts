import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../Services/recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { RecipeState } from '../store/recipe.reducer';
import { updateRecipe } from '../store/recipe.action';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  recipeModel! : UntypedFormGroup
  onEditMode = false;
  selectedRecipeId! : number;
  constructor(private recipeService: RecipeService,
     private route: ActivatedRoute,
     private router: Router,
     private store: Store <AppState>
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((param : Params) =>{
      this.selectedRecipeId = +param['id'];

      if(this.selectedRecipeId){
        this.onEditMode = true;
        this.initForm();
      }
    })

    this.initForm();
  }

  initForm(){
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients = new UntypedFormArray([]);
    let id = -1;
    if(this.onEditMode){
      let recipe : Recipe;
      // recipe = this.recipeService.getRecipeById(this.selectedRecipeId);
      this.store.select('recipes').subscribe( data =>{
        recipe = data.recipes.filter(x => x.id == this.selectedRecipeId)?.[0];
        id = recipe.id;
        name = recipe.name;
        description = recipe.description;
        imagePath = recipe.imagePath;

        recipe.ingredients.forEach(element => {
          ingredients.push(new UntypedFormGroup({
            name: new UntypedFormControl(element.name, Validators.required),
            amount: new UntypedFormControl(element.amount, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
          }));
        });

      })
      
     
    }

    this.recipeModel = new UntypedFormGroup({
      id: new UntypedFormControl(id),
      name: new UntypedFormControl(name, Validators.required),
      description: new UntypedFormControl(description, Validators.required),
      imagePath: new UntypedFormControl(imagePath, Validators.required),
      ingredients: ingredients
    });
  }

  get itemIngredients(){
    return (<UntypedFormArray> this.recipeModel.get('ingredients'))?.controls;
  }

  onAddIngrediant(){
    (<UntypedFormArray> this.recipeModel.get('ingredients')).push(new UntypedFormGroup({
      name: new UntypedFormControl(null),
      amount: new UntypedFormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
    }));
  }

  onSubmit(){
    if(this.onEditMode){
      // this.recipeService.updateRecipe(this.recipeModel.value);
      this.store.dispatch(updateRecipe({ recipe: this.recipeModel.value}));
      this.router.navigate(['../'], {relativeTo: this.route});
    } else{
      this.recipeService.addRecipe(this.recipeModel.value);
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
    (<UntypedFormArray> this.recipeModel.get('ingredients')).removeAt(index);
    // (<FormArray> this.recipeModel.get('ingredients')).clear();

  }
  
}
