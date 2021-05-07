import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailGuard } from 'src/guards/cocktail.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('../list/list.module').then(m => m.ListModule) },
  { path: 'cocktail', loadChildren: () => import('../cocktail/cocktail.module').then(m => m.CocktailModule), canActivate: [CocktailGuard], },
  { path: '**', pathMatch: 'full', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
