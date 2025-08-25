import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLibButtonI, UiLibImageI } from '../../../interfaces';
import { LinkTypeDirective, SwiperDirective } from '../../../directives';
import { UiIconComponent } from '../../shared';

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
