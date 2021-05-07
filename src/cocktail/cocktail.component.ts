import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListProvider } from 'src/list/provider/list.provider';
import { leftToRight, topToBottomAnimation } from 'src/shared/animations';

@Component({
  animations: [topToBottomAnimation, leftToRight],
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent implements OnInit {
  photo = false;
  name = false;
  ingridients = false;

  constructor(public listProvider: ListProvider, private location: Location) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.animateCocktail();
  }
  goBack() {
    this.location.back();
  }

  animateCocktail() {
    setTimeout(() => {
      this.photo = true;
    }, 300);
    setTimeout(() => {
      this.name = true;
    }, 600);
    setTimeout(() => {
      this.ingridients = true;
    }, 1200);
  }

}
