import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'lib-stacked-rows',
    imports: [CommonModule],
    templateUrl: './stacked-rows.component.html',
    styleUrl: './stacked-rows.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedRowsComponent {
    @Input() title?: string;
    @Input() text?: string;
    @Input() items?: StackedRowItemI[];
}

export interface StackedRowItemI {
    title: string;
    text: string;
}
