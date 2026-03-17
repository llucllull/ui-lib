import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective, UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib';
import { UiIconComponent } from '@lluc_llull/ui-lib/shared';
import { SwiperDirective } from '@lluc_llull/ui-lib/sliders';

@Component({
    selector: 'lib-social-footer',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective, SwiperDirective, UiIconComponent],
    templateUrl: './social-footer.component.html',
    styleUrl: './social-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialFooterComponent {
    @Input() images?: UiLibImageI[];
    @Input() socials?: UiLibButtonI[];
    @Input() hashtag?: string;
}
