import { Component, OnInit } from '@angular/core';
import { ListProvider } from './provider/list.provider';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public listProvider: ListProvider) { }

  ngOnInit(): void {
  }

}
