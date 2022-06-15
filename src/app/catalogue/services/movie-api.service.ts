// import { AngularFirestore } from '@angular/fire/compact/firestore';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable} from 'rxjs';
import { CountryResult, MovieResult } from '../catalogue.model';

export const MOVIE_BASE_URL = new InjectionToken<string>('movie base');

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(@Inject(MOVIE_BASE_URL) public baseUrl: string, public http: HttpClient) { }

  getMovieByName(name: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${this.baseUrl}&t=${name}`);
  }

  getCountry(name: string): Observable<CountryResult> {
    return this.http.get<CountryResult>(`https://restcountries.com/v3.1/name/${name}?fullText=true`).pipe(
      map(result => result[0])
    );
  }

  getMovieByImdbId(imdbId: string):Observable<MovieResult>{
    return this.http.get<MovieResult>(`http://www.omdbapi.com/?apikey=540d1872&i=${imdbId}`)
  }
  

}

