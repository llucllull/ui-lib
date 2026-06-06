import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { UiImageComponent } from '@lluc_llull/ui-lib/shared';

@Component({
  selector: 'lib-asymmetric-media',
  imports: [CommonModule, UiImageComponent, ScrollRevealDirective],
  templateUrl: './asymmetric-media.component.html',
  styleUrl: './asymmetric-media.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
      style: 'display: contents',
  },
})
export class AsymmetricMediaComponent {
  @Input() media?: UiLibImageI[];
  @Input() direction: 'left' | 'right' = 'right';
}
