import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private apiUrl = 'https://localhost:44376/Story/GetStories?PageNumber=1&PageSize=20';

  constructor(private http: HttpClient) { }
 // Method to get data from API
 getData(): Observable<any> {
  return this.http.get<any>(this.apiUrl).pipe(
    map(response => response), // Optionally process the response
    catchError(this.handleError<any>('getData', []))
  );
}

// Error handling
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
