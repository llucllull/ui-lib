import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { UiImageComponent } from '@lluc_llull/ui-lib/shared';

@Component({
  selector: 'lib-columns-media-stacked',
  imports: [CommonModule, ScrollRevealDirective, UiImageComponent],
  templateUrl: './columns-media-stacked.component.html',
  styleUrl: './columns-media-stacked.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
      style: 'display: contents',
  },
})
export class ColumnsMediaStackedComponent {
  @Input() leftColumn?: string;
  @Input() rightColumn?: string;
  @Input() direction: 'left' | 'right' = 'right';
  @Input() image?: UiLibImageI;
}
