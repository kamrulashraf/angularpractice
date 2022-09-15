import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredients } from '../../shared/ingredients.model';
import { ShopplingListService } from '../../Services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('newName') viewName! : ElementRef; 
  @ViewChild('newAmount') viewAmount! : ElementRef; 
  @ViewChild('f') shoppingItemForm! : NgForm;
  onEditMode = false;
  subscription! : Subscription;
  selectedIndex! : number;
  @Output('onAddIngrediant') onAddIngrediant : EventEmitter<Ingredients> = new EventEmitter<Ingredients>();
  constructor(private shoppingService:  ShopplingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.IngredientsStartEdit.subscribe( (index : number) =>{
      this.onEditMode = true;
      this.selectedIndex = index;
      var item = this.shoppingService.getIngrediant(index);
      this.shoppingItemForm.setValue({
        name : item.name,
        amount : item.amount
      });
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  addIngrediant(form : NgForm){
    // let name = this.viewName.nativeElement.value;
    // let amount = this.viewAmount.nativeElement.value;
    let name = form.value.name;
    let amount = form.value.amount;
  
    var ing = new Ingredients(name, amount);

    if(this.onEditMode){
      this.shoppingService.updateIngrediants(this.selectedIndex, ing);
    } else{
      this.shoppingService.addIngrediant(ing);
    }

    form.reset();
  }

  onDelete(){
    this.shoppingService.deleteItem(this.selectedIndex);
    this.shoppingItemForm.reset();
    this.onEditMode = false;
  }

  onClear(){
    this.shoppingItemForm.reset();
    this.onEditMode = false;
  }
}
