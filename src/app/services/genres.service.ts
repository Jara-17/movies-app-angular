import { envDev } from '@/env.dev';
import { GenreResponse } from '@/models/genre';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  apiUrl: String = envDev.API_URL;
  apiKey: String = envDev.API_KEY;

  private http: HttpClient = inject(HttpClient);

  getGenres(): Observable<GenreResponse> {
    return this.http.get(
      `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=en`
    );
  }
}
