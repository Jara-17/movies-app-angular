import { Movie } from '@/models/movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesMoviesService {
  private favoritesMovies: Movie[] = this.getFavoritesMovies();

  addToFavorites(movie: Movie): void {
    movie.isFavorite = true;
    this.favoritesMovies.push(movie);
    localStorage.setItem(
      'favoritesMovies',
      JSON.stringify(this.favoritesMovies)
    );
  }

  removeFromFavorites(id: number | undefined): void {
    this.favoritesMovies = this.favoritesMovies.filter(
      (movie) => movie.id !== id
    );
    localStorage.setItem(
      'favoritesMovies',
      JSON.stringify(this.favoritesMovies)
    );
  }

  getFavoritesMovies(): Movie[] {
    return JSON.parse(localStorage.getItem('favoritesMovies') || '[]');
  }

  initializeFavoriteStatus(movie: Movie): void {
    const isFavorite = this.favoritesMovies.some(
      (favMovie) => favMovie.id === movie.id
    );
    movie.isFavorite = isFavorite;
  }
}
