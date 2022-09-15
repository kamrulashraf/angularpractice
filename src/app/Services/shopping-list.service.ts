import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
@Injectable()
export class ShopplingListService{

    // ingrediantChange  = new EventEmitter<Ingredients[]>();
    ingrediantChange  = new Subject<Ingredients[]>();
    IngredientsStartEdit = new Subject<number>();

    ingrediantList = [
        new Ingredients("Apple", 5),
        new Ingredients("Lemon", 7)
    ];

    getIngrediantList(){
        return this.ingrediantList.slice();
    }

    getIngrediant(index : number){
        return this.ingrediantList.slice()[index];
    }

    addIngrediant(data: Ingredients){
        this.ingrediantList.push(data);
        // this.ingrediantChange.emit(this.ingrediantList.slice());
        this.ingrediantChange.next(this.ingrediantList.slice());

    }

    addIngrediants(data: Ingredients[]){
        this.ingrediantList.push(...data);
        // this.ingrediantChange.emit(this.ingrediantList.slice());
        this.ingrediantChange.next(this.ingrediantList.slice());
    }

    updateIngrediants(index : number,  data: Ingredients){
        this.ingrediantList[index] = data;
        this.ingrediantChange.next(this.ingrediantList.slice());
    }

    deleteItem(index : number){
        this.ingrediantList.splice(index,1);
        this.ingrediantChange.next(this.ingrediantList.slice());
    }


}