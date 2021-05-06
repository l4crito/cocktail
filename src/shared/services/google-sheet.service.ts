import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {

  constructor(private http: HttpClient) { }

  getCocktails(): Observable<any> {
    const url =
      `https://docs.google.com/spreadsheets/d/e/2PACX-1vQeQpG2jOWhPr6sGmrwdFOt5mm02yfT3A-m3xLLmU95Ipvsxqth7YevABjX3c764g/pub?output=tsv`;
    return this.http.get(url, { responseType: 'text' as any });
  }
}
