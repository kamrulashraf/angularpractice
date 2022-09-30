import { Component, ViewChild, AfterViewInit, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthService } from './auththentication/services/auth.service';
import { AlertContainerDirective } from './alert-container.directive';
import { AlertBoxComponent } from './shared/alert-box/alert-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild(ShoppingListComponent) shoppingListComponent! : ShoppingListComponent;

  @ViewChild(AlertContainerDirective, {static: true}) alertContainer! : AlertContainerDirective;
  public userAuthenticated = false;

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

  constructor(private authService: AuthService){
   
  }

  ngOnInit(): void {
    this.showErrorMessage();
  }

  showErrorMessage(){
    const viewContainerRef = this.alertContainer.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AlertBoxComponent>(AlertBoxComponent);
    componentRef.instance.message = "This is an error";

    componentRef.instance.close.subscribe( () => {
      viewContainerRef.clear();
    })
  }
  
}

