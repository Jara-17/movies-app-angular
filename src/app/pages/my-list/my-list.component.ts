import { CustomTitleComponent } from '@/components/custom-title/custom-title.component';
import { MovieCardComponent } from '@/components/movies/movie-card/movie-card.component';
import { MoviesFavoritesComponent } from '@/components/movies/movies-favorites/movies-favorites.component';
import { LayoutComponent } from '@/layout/layout.component';
import { Movie } from '@/models/movie';
import { FavoritesMoviesService } from '@/services/favorites-movies.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'my-list',
  standalone: true,
  imports: [
    LayoutComponent,
    CustomTitleComponent,
    MoviesFavoritesComponent,
    MovieCardComponent,
  ],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.css',
})
export class MyListComponent implements OnInit {
  favoritesMovies: Movie[] = [];

  private favoritesMoviesService: FavoritesMoviesService = inject(
    FavoritesMoviesService
  );

  ngOnInit(): void {
    this.loadFavoritesMovies();
  }

  loadFavoritesMovies(): void {
    this.favoritesMovies = this.favoritesMoviesService.getFavoritesMovies();
  }
}
