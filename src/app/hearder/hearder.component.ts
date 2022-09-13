import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css']
})
export class HearderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output('loadPage') pageName : EventEmitter<string> = new EventEmitter<string>();
  LoadPage(pageName : string){
    this.pageName.emit(pageName);
  }
}
