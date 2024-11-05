import { envDev } from '@/env.dev';
import { Movie, MovieResponse } from '@/models/movie';
import { MovieDetail } from '@/models/movieDetail';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiKey: string = envDev.API_KEY;
  apiUrl: string = envDev.API_URL;

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  /**
   ** Obtener películas populares
   * */
  getPopularMovies(page: number): Observable<MovieResponse> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}
    `;
    return this.http.get<MovieResponse>(url);
  }

  /**
   ** Obtener pelicúla por su id
   */
  getMovieById(movieId: number): Observable<MovieDetail> {
    const url = `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<MovieDetail>(url);
  }

  /**
   ** Search movie by name
   */
  searchMovies(query: string, page: number): Observable<MovieResponse> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}`;
    return this.http.get<MovieResponse>(url);
  }
}
