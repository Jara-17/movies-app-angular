import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomTitleComponent } from '@/components/custom-title/custom-title.component';
import { Movie } from '@/models/movie';
import { Genre } from '@/models/genre';
import { FavoritesMoviesService } from '@/services/favorites-movies.service';

@Component({
  selector: 'movie-card',
  standalone: true,
  imports: [CustomTitleComponent, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  @Input() genres!: Genre;

  private favoritesMoviesService = inject(FavoritesMoviesService);

  ngOnInit() {
    // Inicializamos el estado de favorito para cada película
    this.favoritesMoviesService.initializeFavoriteStatus(this.movie);
  }

  getImageUrl(imagePath: string | undefined, size: string = 'w500'): string {
    return `https://image.tmdb.org/t/p/${size}${imagePath}`;
  }

  toggleFavorite(): void {
    if (this.movie.isFavorite) {
      this.favoritesMoviesService.removeFromFavorites(this.movie.id);
      this.movie.isFavorite = false;
      return;
    }

    this.favoritesMoviesService.addToFavorites(this.movie);
    this.movie.isFavorite = true;
  }
}
