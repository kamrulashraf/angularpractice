import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, DoCheck, AfterContentInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShopplingListService } from '../Services/shopping-list.service';
import { Subscription } from 'rxjs';

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
  ingredients : Ingredients[] = [];

  name : string = '';
  private ingSubscriber!: Subscription;
  @Input('globalObj') testObj : {type: string , name : string} = {type: '', name: ''};

  @Output() eventItem  = new EventEmitter<string>();
  @ViewChild('tempRef') tempRef! : ElementRef ;

  constructor(private shopplingListService : ShopplingListService ) { 

  }

  ngOnInit(): void {
    this.ingredients = this.shopplingListService.getIngrediantList();
    this.ingSubscriber = this.shopplingListService.ingrediantChange.subscribe((list) => {
      this.ingredients = list;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on change ' +  changes);
  }

  ngDoCheck(): void {
    console.log('do chnages')
    console.log(this.name);
  }

  ngAfterContentInit(): void {
    console.log('after content init');
  }

  ngOnDestroy(): void {
    this.ingSubscriber.unsubscribe();
  }

  addIngeridiants(data: Ingredients){
    // this.ingredients.push(data);
    // console.log(this.ingredients);
    this.shopplingListService.addIngrediant(data);
  }

  sendEventToParent(event : any){
    console.log(event);
    console.log(this.tempRef.nativeElement.value)
    this.ingredients.splice(0,2);
    this.eventItem.emit("Output event");
  }

  onNameChange(event : any){
    this.name = event.type;
    console.log(this.name);
  }

  onSelectShoppingList(index : number){
    this.shopplingListService.IngredientsStartEdit.next(index);
  }
}
