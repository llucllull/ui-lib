import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HighlightDirective, ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';

@Component({
    selector: 'lib-category-progress',
    standalone: true,
    imports: [CommonModule, HighlightDirective, ScrollRevealDirective],
    templateUrl: './category-progress.component.html',
    styleUrl: './category-progress.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
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
