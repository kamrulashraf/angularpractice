import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe! : Recipe;
  @Output() onSelectItem : EventEmitter<any> = new EventEmitter();
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
}
