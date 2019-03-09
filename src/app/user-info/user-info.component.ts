import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input()
  detail?:  any;

  @Output()
  detailCleared?: EventEmitter<{}> = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  }

  clear() {
    this.detailCleared.emit({});
  }

}
