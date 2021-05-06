import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CocktailModel } from 'src/shared/models/cocktail.model';
import { GoogleSheetService } from 'src/shared/services/google-sheet.service';
import { getItem, Names, setItem } from 'src/shared/utils/store.util';

@Injectable({
  providedIn: 'root'
})
export class ListProvider {
  canFilter = false;
  filterValue$ = new BehaviorSubject<string>('');
  cocktailPool: CocktailModel[] = [];
  cocktais: CocktailModel[] = [];
  searching = false;

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
      this.shuffleCocktails();
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
          ingredients: t.ingredientes,
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
    this.searching = false;
    this.cocktais = this.cocktailPool.sort(() => 0.5 - Math.random()).slice(0, 15);
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
      return;
    }
    const filter = value.trim().toLowerCase();

    this.cocktais = this.cocktailPool
      .filter(cocktail => cocktail.name.toLowerCase().includes(filter))
      .slice(0, 15);
    this.searching = false
  }


}
