import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css']
})
export class HearderComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  @Output('loadPage') pageName : EventEmitter<string> = new EventEmitter<string>();
  LoadPage(pageName : string){
    this.pageName.emit(pageName);
  }

  onFetchRecipe(){
    this.dataService.getRecipeList()
      .subscribe();
  }
}
