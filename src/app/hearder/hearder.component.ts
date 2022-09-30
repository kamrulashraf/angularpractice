import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auththentication/services/auth.service';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css']
})
export class HearderComponent implements OnInit {

  isUserAuthenticated : boolean = false;
  // constructor(private dataService: DataService,
  //   private authService: AuthService  
  // ) { }

  constructor(private authService: AuthService,
    private dataService: DataService
  ){
    this.authService.loginChanged
    .subscribe(userAuthenticated => {
      this.isUserAuthenticated = userAuthenticated;
    })
  }

  ngOnInit(): void {
    this.authService.isAuthenticated()
    .then(isUserAuthenticated => {
      this.isUserAuthenticated = isUserAuthenticated;
    })
  }

  

  @Output('loadPage') pageName : EventEmitter<string> = new EventEmitter<string>();
  LoadPage(pageName : string){
    this.pageName.emit(pageName);
  }

  onFetchRecipe(){
    // this.dataService.getRecipeList()
    //   .subscribe();
  }

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }
}
