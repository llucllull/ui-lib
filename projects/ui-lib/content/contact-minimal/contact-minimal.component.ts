import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
    HighlightDirective,
    LinkTypeDirective,
    ScrollRevealDirective,
} from '@lluc_llull/ui-lib/directives';
import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'lib-contact-minimal',
    imports: [CommonModule, HighlightDirective, LinkTypeDirective, ScrollRevealDirective],
    templateUrl: './contact-minimal.component.html',
    styleUrl: './contact-minimal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class ContactMinimalComponent {
    @Input() contactsTitle?: string;
    @Input() socialsTitle?: string;
    @Input() contacts?: UiLibButtonI[];
    @Input() socials?: UiLibButtonI[];
    @Input() img?: UiLibImageI;
}
