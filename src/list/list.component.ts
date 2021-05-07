import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { apearAnimation, leftToRight, zoomIn } from 'src/shared/animations';
import { CocktailModel } from 'src/shared/models/cocktail.model';
import { ListProvider } from './provider/list.provider';

@Component({
  animations: [
    apearAnimation,
    leftToRight,
    zoomIn
  ],
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('txtSearch') txtSearch: ElementRef;

  constructor(public listProvider: ListProvider, private router: Router) { }

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

  selectCocktail(cocktail: CocktailModel) {
    this.listProvider.selectedCocktail = cocktail;
    this.router.navigate(['/cocktail']);
  }

}
