import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';
import { UiImageComponent } from '@lluc_llull/ui-lib/shared';

@Component({  
  selector: 'lib-media-intro',
  imports: [CommonModule, ScrollRevealDirective, UiImageComponent],
  templateUrl: './media-intro.component.html',
  styleUrl: './media-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
      style: 'display: contents',
  },
})
export class MediaIntroComponent {
  @Input() highlightedText?: string;
  @Input() secondaryText?: string;
  @Input() direction: 'left' | 'right' = 'right';
  @Input() media?: UiLibImageI;
}
