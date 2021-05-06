import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CocktailModel } from 'src/shared/models/cocktail.model';
import { GoogleSheetService } from 'src/shared/services/google-sheet.service';
import { getItem, Names, setItem } from 'src/shared/utils/store.util';

@Injectable({
  providedIn: 'root'
})
export class ListProvider {

  filterValue$ = new BehaviorSubject<string>('');
  cocktailPool: CocktailModel[] = [];
  cocktais: CocktailModel[] = [];

  constructor(private googleService: GoogleSheetService) {
    this.getStoredCocktails();
    this.fetchCocktails();
    this.filterValue$.subscribe(res => this.filterCocktails(res));
  }
  get filterValue() {
    return this.filterValue$.value;
  }
  set filterValue(value: string) {
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
      if (!this.cocktailPool.length) {
        this.shuffleCocktails();
      }
      setItem(Names.COCKTAILS, this.cocktailPool);
    });
  }
  shuffleCocktails() {
    this.cocktais = this.cocktailPool.sort(() => 0.5 - Math.random()).slice(0, 15);
  }
  getStoredCocktails() {
    const cockatails = getItem(Names.COCKTAILS);
    this.cocktailPool = cockatails ?? [];
    this.shuffleCocktails();
  }

  filterCocktails(value: string) {
    const filter = value.trim().toLowerCase();
    if (!filter) {
      this.shuffleCocktails();
      return;
    }
    this.cocktais = this.cocktailPool
      .filter(cocktail => cocktail.name.toLowerCase().includes(filter))
      .slice(0, 15);
    console.log(this.cocktais)
  }
}
