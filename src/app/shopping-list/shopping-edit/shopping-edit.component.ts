import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredients } from '../../shared/ingredients.model';
import { ShopplingListService } from '../../Services/shopping-list.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShoppingListState } from '../store/shopping-list.reducer';
import * as ShoppingListAction from '../store/shopping-list.action'
import * as fromAppState from '../../app.reducer';
import { AppState } from '../../app.reducer';
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
  constructor(private shoppingService:  ShopplingListService,
    private store: Store<fromAppState.AppState>) { }

  ngOnInit(): void {
    // this.subscription = this.shoppingService.IngredientsStartEdit.subscribe( (index : number) =>{
    //   this.onEditMode = true;
    //   this.selectedIndex = index;
    //   var item = this.shoppingService.getIngrediant(index);
    //   this.shoppingItemForm.setValue({
    //     name : item.name,
    //     amount : item.amount
    //   });
    // })

    this.store.select('shoppingList').subscribe(data =>{
      if(data.editedIndex > -1){
        this.onEditMode = true;
        this.selectedIndex = data.editedIndex;
        var item = <Ingredients>data.editedIng;
        this.shoppingItemForm.setValue({
          name : item.name,
          amount : item.amount
        });
      }
    })
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }


  addIngrediant(form : NgForm){
    // let name = this.viewName.nativeElement.value;
    // let amount = this.viewAmount.nativeElement.value;
    let name = form.value.name;
    let amount = form.value.amount;
  
    var ing = new Ingredients(name, amount);

    if(this.onEditMode){
      // this.shoppingService.updateIngrediants(this.selectedIndex, ing);
      this.store.dispatch(new ShoppingListAction.UpdateIngredient(ing));
    } else{
      // this.shoppingService.addIngrediant(ing);
      this.store.dispatch(new ShoppingListAction.AddIngredient(ing));
    }

    form.reset();
  }

  onDelete(){
    // this.shoppingService.deleteItem(this.selectedIndex);
    this.store.dispatch(new ShoppingListAction.DeleteIngredient())
    this.shoppingItemForm.reset();
    this.onEditMode = false;
  }

  onClear(){
    this.shoppingItemForm.reset();
    this.onEditMode = false;
    this.store.dispatch(new ShoppingListAction.EndEdtiIng())
  }
}
