import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListProvider } from 'src/list/provider/list.provider';

@Injectable({
  providedIn: 'root'
})
export class CocktailGuard implements CanActivate {
  constructor(
    private listProvider: ListProvider,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const selectedCocktail = this.listProvider.selectedCocktail ? true : false;
    if (!selectedCocktail) {
      this.router.navigate(['/']);
    }
    return selectedCocktail;
  }

}
