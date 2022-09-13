import { Ingredients } from '../shared/ingredients.model';
export class Recipe{
    public id: number;
    public name : string;
    public description: string;
    public imagePath : string;
    public ingredients: Ingredients[];
    constructor(id: number, name: string,descr: string, image: string, ingrediants: Ingredients[]){
        this.id = id;
        this.name = name;
        this.description = descr;
        this.imagePath = image;
        this.ingredients = ingrediants;
    }
}