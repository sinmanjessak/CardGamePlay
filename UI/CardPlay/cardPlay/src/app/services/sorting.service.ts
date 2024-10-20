import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  private apiUrl = 'https://localhost:7077/api/Card/sort';

  constructor(private http: HttpClient) { }

  sortCards(cards: string[]): Observable<{sortedCards:string[]} > {
    const requestBody = { cards }; 
    return this.http.post<{sortedCards:string[]}>(this.apiUrl,requestBody);
  }
}
