import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuItem } from '@/models/menuItem';
import { ThemeService } from '@/services/theme.service';
import { SearchService } from '@/services/search.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input() changeIcons: boolean = false;
  menuItems: MenuItem[] = [
    { label: 'Home', link: '/', active: true },
    { label: 'My List', link: '/movies/my-list', active: false },
  ];

  private themeService: ThemeService = inject(ThemeService);
  private searchService = inject(SearchService);
  private fb = inject(FormBuilder);

  searchForm!: FormGroup;

  ngOnInit() {
    this.initializeDarkMode();
    this.initializeSearchForm();
  }

  private initializeDarkMode() {
    this.subscribeToDarkModeChanges();
    this.setInitialDarkMode();
  }

  private subscribeToDarkModeChanges() {
    this.themeService.darkModeChanged.subscribe((isDarkMode) => {
      this.changeIcons = isDarkMode;
    });
  }

  private setInitialDarkMode() {
    this.changeIcons = this.themeService.getInitialDarkMode();
  }

  private initializeSearchForm() {
    this.searchForm = this.fb.group({
      searchQuery: [''],
    });
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  setActive(item: MenuItem) {
    this.menuItems.forEach((menuItem) => (menuItem.active = false));
    item.active = true;
  }

  onSearch() {
    const query = this.searchForm.get('searchQuery')?.value || '';
    console.log('Buscando:', query);
    this.searchService.updateSearchQuery(query);
    this.searchForm.reset();
  }
}
