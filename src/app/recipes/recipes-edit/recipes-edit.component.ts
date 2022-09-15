import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../Services/recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  recipeModel! : FormGroup
  onEditMode = false;
  selectedRecipeId! : number;
  constructor(private recipeService: RecipeService,
     private route: ActivatedRoute,
     private router: Router) { }
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
    let ingredients = new FormArray([]);
    let id = -1;
    debugger
    if(this.onEditMode){
      let recipe : Recipe;
      recipe = this.recipeService.getRecipeById(this.selectedRecipeId);
      id = recipe.id;
      name = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;
      recipe.ingredients.forEach(element => {
        ingredients.push(new FormGroup({
          name: new FormControl(element.name, Validators.required),
          amount: new FormControl(element.amount, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
        }));
      });
    }

    this.recipeModel = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: ingredients
    });
  }

  get itemIngredients(){
    return (<FormArray> this.recipeModel.get('ingredients'))?.controls;
  }

  onAddIngrediant(){
    (<FormArray> this.recipeModel.get('ingredients')).push(new FormGroup({
      name: new FormControl(null),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
    }));
  }

  onSubmit(){
    if(this.onEditMode){
      this.recipeService.updateRecipe(this.recipeModel.value);
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
    (<FormArray> this.recipeModel.get('ingredients')).removeAt(index);
    // (<FormArray> this.recipeModel.get('ingredients')).clear();

  }
}
