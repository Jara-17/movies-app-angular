import { Component, inject, OnInit } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { Movie, MovieResponse } from '@/models/movie';
import { MoviesService } from '@/services/movies.service';
import { GenreResponse } from '@/models/genre';
import { GenresService } from '@/services/genres.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { CustomTitleComponent } from '../custom-title/custom-title.component';
import { FavoritesMoviesService } from '@/services/favorites-movies.service';
import { SearchService } from '@/services/search.service';

@Component({
  selector: 'movies',
  standalone: true,
  imports: [MovieCardComponent, PaginationComponent, CustomTitleComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'], // Corregido 'styleUrl' a 'styleUrls'
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genresMap: { [id: number]: string } = {};
  page: number = 1;
  totalPages: number = 1;
  isSearch: boolean = false;

  private moviesService: MoviesService = inject(MoviesService);
  private genresService: GenresService = inject(GenresService);
  private favoritesMoviesService: FavoritesMoviesService = inject(
    FavoritesMoviesService
  );
  private searchService: SearchService = inject(SearchService);

  ngOnInit(): void {
    // Cargar géneros al inicializar el componente
    this.loadGenres();

    // Suscribirse a los cambios en la búsqueda
    this.searchService.searchQuery$.subscribe((query) => {
      if (query) {
        this.searchMovies(query); // Buscar películas
        this.isSearch = true;
      } else {
        this.loadPopularMovies(); // Cargar populares si no hay búsqueda
        this.isSearch = false;
      }
    });
  }

  loadGenres() {
    this.genresService.getGenres().subscribe({
      next: (response: GenreResponse) => {
        this.genresMap =
          response.genres?.reduce((map, genre) => {
            if (genre.id !== undefined && genre.name) {
              map[genre.id] = genre.name;
            }
            return map;
          }, {} as { [id: number]: string }) || {};
      },
      error: (error: Error) => {
        console.error('Error fetching genres:', error);
      },
      complete: () => {
        // Cargar películas populares solo después de que se hayan cargado los géneros
        this.loadPopularMovies();
      },
    });
  }

  loadPopularMovies() {
    this.moviesService.getPopularMovies(this.page).subscribe({
      next: (response: MovieResponse) => {
        const favoriteMovies = this.favoritesMoviesService.getFavoritesMovies();

        this.movies =
          response.results?.map((movie) => {
            return {
              ...movie,
              genres: movie.genre_ids?.map((id) => this.genresMap[id]),
              isFavorite: favoriteMovies.some(
                (favMovie) => favMovie.id === movie.id
              ),
            };
          }) || [];

        this.totalPages = response?.total_pages || 0;
      },
      error: (error) => {
        console.error('Error fetching popular movies:', error);
      },
    });
  }

  searchMovies(query: string) {
    this.moviesService.searchMovies(query, this.page).subscribe({
      next: (response: MovieResponse) => {
        this.movies =
          response.results?.map((movie) => {
            return {
              ...movie,
              genres: movie.genre_ids?.map((id) => this.genresMap[id]),
              isFavorite: this.favoritesMoviesService
                .getFavoritesMovies()
                .some((favMovie) => favMovie.id === movie.id),
            };
          }) || [];
        this.totalPages = response.total_pages || 1;
      },
      error: (error) => {
        console.error('Error searching movies:', error);
      },
    });
  }

  // Métodos de paginación
  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPopularMovies();
    }
  }

  goToNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPopularMovies();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadPopularMovies();
    }
  }
}
