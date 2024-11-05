import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '@/components/navbar/navbar.component';
import { ThemeService } from '@/services/theme.service';
import { CustomFooterComponent } from '@/components/custom-footer/custom-footer.component';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [NavbarComponent, CustomFooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  isDarkMode: boolean = false;

  private themeService: ThemeService = inject(ThemeService);

  constructor() {}

  ngOnInit(): void {
    this.themeService.darkModeChanged.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      console.log(this.isDarkMode);
    });
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
