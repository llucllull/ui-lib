import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SwiperDirective } from '../../../../../../sliders/swiper.directive';
import { LinkTypeDirective } from '../../../../directives';
import { UiLibButtonI, UiLibImageI } from '../../../../interfaces';
import { UiIconComponent } from '../../../shared/ui-icon';

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
