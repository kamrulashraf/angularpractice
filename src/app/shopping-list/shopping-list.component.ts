import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, DoCheck, AfterContentInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShopplingListService } from '../Services/shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShoppingListState } from './store/shopping-list.reducer';
import * as shoppingListAction from './store/shopping-list.action'
import * as fromAppState from '../app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements
  OnInit, 
  OnChanges,
  DoCheck,
  AfterContentInit,
  OnDestroy {
  // ingredients : Ingredients[] = [];
  ingredients! : Observable<ShoppingListState>;


  name : string = '';
  private ingSubscriber!: Subscription;
  @Input('globalObj') testObj : {type: string , name : string} = {type: '', name: ''};

  @Output() eventItem  = new EventEmitter<string>();
  @ViewChild('tempRef') tempRef! : ElementRef ;

  constructor(private shopplingListService : ShopplingListService,
    private store: Store< fromAppState.AppState >){ 
  }

  ngOnInit(): void {
    this.ingredients =  this.store.select('shoppingList');
    // this.ingredients = this.shopplingListService.getIngrediantList();
    // this.ingSubscriber = this.shopplingListService.ingrediantChange.subscribe((list) => {
    //   this.ingredients = list;
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngDoCheck(): void {
  }

  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {
    // this.ingSubscriber.unsubscribe();
  }

  addIngeridiants(data: Ingredients){
    // this.shopplingListService.addIngrediant(data);
    this.store.dispatch(new shoppingListAction.AddIngredient(data));
  }

  sendEventToParent(event : any){
    console.log(event);
    console.log(this.tempRef.nativeElement.value)
    // this.ingredients.splice(0,2);
    this.eventItem.emit("Output event");
  }

  onNameChange(event : any){
    this.name = event.type;
    console.log(this.name);
  }

  onSelectShoppingList(index : number){
    // this.shopplingListService.IngredientsStartEdit.next(index);
    this.store.dispatch(new shoppingListAction.StartEditIng(index))
  }
}
