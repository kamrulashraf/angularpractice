import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
@Injectable()
export class ShopplingListService{

    // ingrediantChange  = new EventEmitter<Ingredients[]>();
    ingrediantChange  = new Subject<Ingredients[]>();

    ingrediantList = [
        new Ingredients("Apple", 5),
        new Ingredients("Lemon", 7)
    ];

    getIngrediantList(){
        return this.ingrediantList.slice();
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


}