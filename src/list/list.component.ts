import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { apearAnimation } from 'src/shared/animations';
import { ListProvider } from './provider/list.provider';

@Component({
  animations: [
    apearAnimation
  ],
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('txtSearch') txtSearch: ElementRef;

  constructor(public listProvider: ListProvider) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.focusInput();
    }, 300);
  }

  clear() {

    this.listProvider.filterValue = '';
    this.focusInput();

  }
  focusInput() {
    if (window.innerWidth < 800) {
      return;
    }
    this.txtSearch.nativeElement.focus();
  }

}
