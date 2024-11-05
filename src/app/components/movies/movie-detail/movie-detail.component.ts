import { CustomTitleComponent } from '@/components/custom-title/custom-title.component';
import { LayoutComponent } from '@/layout/layout.component';
import { Movie } from '@/models/movie';
import { MovieDetail } from '@/models/movieDetail';
import { MoviesService } from '@/services/movies.service';
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'movie-detail',
  standalone: true,
  imports: [LayoutComponent, DatePipe, CustomTitleComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  movie!: MovieDetail;

  private moviesService: MoviesService = inject(MoviesService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('movieId'));
    console.log(movieId);
    this.loadMovie(movieId);
  }

  loadMovie(id: number) {
    this.moviesService.getMovieById(id).subscribe({
      next: (response: MovieDetail) => {
        this.movie = response || {};
      },
      error: (error: Error) => {
        console.error('Error loading movie:', error);
        this.router.navigate(['/']);
      },
    });
  }

  getImageUrl(imagePath: string | undefined, size: string = 'w500'): string {
    return `https://image.tmdb.org/t/p/${size}${imagePath}`;
  }
}
