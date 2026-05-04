import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { SwiperDirective } from '@lluc_llull/ui-lib/sliders';
import { UiIconComponent } from '@lluc_llull/ui-lib/shared';

@Component({
    selector: 'lib-social-footer',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective, SwiperDirective, UiIconComponent],
    templateUrl: './social-footer.component.html',
    styleUrl: './social-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class SocialFooterComponent {
    @Input() images?: UiLibImageI[];
    @Input() socials?: UiLibButtonI[];
    @Input() hashtag?: string;
}
