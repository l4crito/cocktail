import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListProvider } from 'src/list/provider/list.provider';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent implements OnInit {

  constructor(public listProvider: ListProvider, private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

  }
  goBack() {
    this.router.navigate(['']);
  }

}
