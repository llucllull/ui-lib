import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryProgressI } from './category-progress.interface';

@Component({
  selector: 'lib-category-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-progress.component.html',
  styleUrl: './category-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProgressComponent {
  @Input() pretitle?: string;
  @Input() title?: string;
  @Input() categories?: ProgressCategoryI[];
}

export interface ProgressItemI {
  label: string;
  value: number;
}

export interface ProgressCategoryI {
  title: string;
  items: ProgressItemI[];
}
