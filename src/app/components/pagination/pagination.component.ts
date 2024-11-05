import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() goToPreviousPage = new EventEmitter<number>();
  @Output() goToNextPage = new EventEmitter<number>();
  @Output() goToPage = new EventEmitter<number>();

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.goToPreviousPage.emit(this.currentPage - 1);
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToNextPage.emit(this.currentPage + 1);
    }
  }

  onPageSelect(page: number) {
    if (page !== this.currentPage) {
      this.goToPage.emit(page);
    }
  }
}
