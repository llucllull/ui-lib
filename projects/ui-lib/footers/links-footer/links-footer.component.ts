import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLibButtonI } from '@lluc_llull/ui-lib/interfaces';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';

@Component({
    selector: 'lib-links-footer',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective],
    templateUrl: './links-footer.component.html',
    styleUrl: './links-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class LinksFooterComponent {
    @Input() links?: UiLibButtonI[];
}
