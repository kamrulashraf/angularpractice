import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredients } from '../../shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('newName') viewName! : ElementRef; 
  @ViewChild('newAmount') viewAmount! : ElementRef; 

  @Output('onAddIngrediant') onAddIngrediant : EventEmitter<Ingredients> = new EventEmitter<Ingredients>();
  constructor() { }

  ngOnInit(): void {
  }


  addIngrediant(form : NgForm){
    
    // let name = this.viewName.nativeElement.value;
    // let amount = this.viewAmount.nativeElement.value;

    let name = form.value.name;
    let amount = form.value.amount;
    var ing = new Ingredients(name, amount);
    this.onAddIngrediant.emit(ing);
  }
}
