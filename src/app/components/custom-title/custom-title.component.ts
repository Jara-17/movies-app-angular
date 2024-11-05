import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-title',
  standalone: true,
  imports: [],
  templateUrl: './custom-title.component.html',
  styleUrl: './custom-title.component.css',
})
export class CustomTitleComponent {
  @Input() text: string | undefined = '';
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  @Input() hover: boolean = false;
}
