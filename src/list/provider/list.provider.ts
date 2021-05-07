import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CocktailContainer, CocktailModel } from 'src/shared/models/cocktail.model';
import { GoogleSheetService } from 'src/shared/services/google-sheet.service';
import { getItem, Names, setItem } from 'src/shared/utils/store.util';

@Injectable({
  providedIn: 'root'
})
export class ListProvider {
  selectedCocktail: CocktailModel;
  canFilter = false;
  filterValue$ = new BehaviorSubject<string>('');
  cocktailPool: CocktailModel[] = [];
  cocktais: CocktailModel[] = [];
  searching = false;
  shuffling = false;
  scrollY = 0;

  constructor(private googleService: GoogleSheetService) {
    this.filterValue$.
      pipe(
        debounceTime(700)).
      subscribe(res => this.filterCocktails(res));
    this.getStoredCocktails();
    this.fetchCocktails();
    setTimeout(() => {
      this.canFilter = true;
    }, 2000);
  }
  get filterValue() {
    return this.filterValue$.value;
  }
  set filterValue(value: string) {
    if (value) {
      this.searching = true;
    } else {
      this.sliceCocktails();
    }
    this.filterValue$.next(value);

  }

  fetchCocktails() {
    this.googleService.getCocktails().subscribe((res: any) => {
      var lines = res.split("\r\n");
      var result = [];
      var headers = lines[0].split("\t");
      for (var i = 1; i < lines.length; i++) {

        var obj: any = {};
        var currentline = lines[i].split("\t");

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]?.trim()] = currentline[j]?.trim();
        }
        result.push(obj);
      }

      const cocktails: CocktailModel[] = result.filter(t => t.nombre.trim()).map(t => {
        return {
          name: t.nombre?.trim(),
          ingredients: t.ingredientes?.split('*'),
          decoration: t.decoracion,
          preparation: t.preparacion,
          container: t.sirve,
          photo: t.foto?.trim() ? t.foto?.trim() : '../assets/cocktail.png'
        }
      });
      this.cocktailPool = cocktails;
      if (!this.cocktais.length) {
        this.shuffleCocktails();
      }
      setItem(Names.COCKTAILS, this.cocktailPool);
    });
  }
  shuffleCocktails() {
    if (this.shuffling) {
      return;
    }
    window.scrollTo(0, 0);
    this.searching = false;
    this.shuffling = true;
    setTimeout(() => {
      this.shuffling = false;
      this.cocktailPool.sort(() => 0.5 - Math.random());
      this.sliceCocktails();
    }, 300);
  }
  getStoredCocktails() {
    const cockatails = getItem(Names.COCKTAILS);
    this.cocktailPool = cockatails ?? [];
    this.shuffleCocktails();
  }

  filterCocktails(value: string) {
    if (!this.canFilter) {
      this.searching = false;
      return;
    }
    if (!value) {
      this.searching = false;
      return;
    }
    const filter = value.trim().split(' ');

    this.cocktais = this.cocktailPool
      .filter(cocktail =>
        this.isPresent(filter, cocktail.name) ||
        this.isPresent(filter, cocktail.decoration) ||
        this.isPresent(filter, cocktail.ingredients.join(' ')) ||
        this.isPresent(filter, cocktail.preparation)
      )
      .slice(0, 15);
    window.scrollTo(0, 0);
    this.searching = false
  }

  sliceCocktails() {
    this.cocktais = this.cocktailPool.slice(0, 25);
  }

  isPresent(list: string[], value: string) {
    let exists = true;
    value = value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    for (const item of list) {
      if (value.includes(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        exists = exists && true;
      } else {
        exists = exists && false;

      }
    }
    return exists;
  }

}
