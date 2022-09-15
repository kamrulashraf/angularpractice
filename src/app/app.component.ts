import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(ShoppingListComponent) shoppingListComponent! : ShoppingListComponent;

  showUnless = true;
  switchTest = 3;
  title = 'practiceapp';
  colorChange = 'redcolor';
  showParagraph = true;
  loadedPage: string = "";

  appObj = {
    type : "test",
    name : 'test'
  }

  obj  = {
    'background-color': 'red'
  };

  ngAfterViewInit(){

  }

  changeColor(){
    if(this.colorChange === 'redcolor'){
      this.colorChange = 'bluecolor';
      this.showParagraph = false;
    }
    else{
      this.colorChange = 'redcolor';
      this.showParagraph = true;
    }
  }
  
  outFunc(event : any){
    console.log(event);
  }


  updateGlobalObj(){
    this.appObj = {
      type : "update",
      name : 'test'
    }
  }

  showPage(page: string){
      debugger
      this.loadedPage = page;
  }

  toggleUnless(){
    this.showUnless = !this.showUnless;
  }
}

