import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild(ShoppingListComponent) shoppingListComponent! : ShoppingListComponent;

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
    // this.authService.loginChanged
    // .subscribe(userAuthenticated => {
    //   this.userAuthenticated = userAuthenticated;
    // })
  }

  ngOnInit(): void {
    // this.authService.isAuthenticated()
    // .then(userAuthenticated => {
    //   this.userAuthenticated = userAuthenticated;
    // })
  }
}

