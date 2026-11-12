import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';

@Component({
    selector: 'lib-stacked-rows',
    imports: [CommonModule, ScrollRevealDirective],
    templateUrl: './stacked-rows.component.html',
    styleUrl: './stacked-rows.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
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
