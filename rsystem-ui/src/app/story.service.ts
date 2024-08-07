import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {


  constructor(private http: HttpClient) { }
 // Method to get data from API
 getData(pn:number,ps:number,kw:string): Observable<any> {
  return this.http.get<any>(environment.api_url + 'Story/GetStories?PageNumber='+pn+'&PageSize='+ps+'&Search='+kw).pipe(
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
