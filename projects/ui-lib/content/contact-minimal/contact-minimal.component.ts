import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { HighlightDirective, LinkTypeDirective } from '@lluc_llull/ui-lib/directives';

@Component({
    selector: 'lib-contact-minimal',
    imports: [CommonModule, HighlightDirective, LinkTypeDirective],
    templateUrl: './contact-minimal.component.html',
    styleUrl: './contact-minimal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMinimalComponent {
    @Input() contactsTitle?: string;
    @Input() socialsTitle?: string;
    @Input() contacts?: UiLibButtonI[];
    @Input() socials?: UiLibButtonI[];
    @Input() img?: UiLibImageI;
}

