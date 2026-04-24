import { CommonModule, DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { LinkTypeDirective, ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { UiIconComponent } from '@lluc_llull/ui-lib/shared';

@Component({
    selector: 'lib-hero-section',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective, UiIconComponent, ScrollRevealDirective],
    templateUrl: './hero-section.component.html',
    styleUrl: './hero-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent implements OnInit, OnDestroy {
    @Input() variant: 'text' | 'image' = 'text';
    @Input() pretitle?: string;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() text?: string;
    @Input() buttons?: UiLibButtonI[];
    @Input() highlight?: string;
    @Input() image?: UiLibImageI;

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngOnInit(): void {
        if (this.variant === 'image') {
            this.document.body.classList.add('has-hero-image');
        }
    }

    ngOnDestroy(): void {
        this.document.body.classList.remove('has-hero-image');
    }
}
