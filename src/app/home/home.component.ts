import { Component } from '@angular/core';
import { LayoutComponent } from '@/layout/layout.component';
import { MoviesComponent } from '@/components/movies/movies.component';
import { CustomTitleComponent } from '@/components/custom-title/custom-title.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [LayoutComponent, MoviesComponent, CustomTitleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
