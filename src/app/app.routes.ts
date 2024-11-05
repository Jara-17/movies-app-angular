import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './components/movies/movie-detail/movie-detail.component';
import { MyListComponent } from './pages/my-list/my-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'movies/detail/:movieId',
    component: MovieDetailComponent,
  },

  {
    path: 'movies/my-list',
    component: MyListComponent,
  },
];
