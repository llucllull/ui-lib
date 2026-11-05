import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective, ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibButtonI } from '@lluc_llull/ui-lib/interfaces';
import { UiIconComponent } from '@lluc_llull/ui-lib/shared';

@Component({
  selector: 'lib-split-showcase',
  imports: [CommonModule, ScrollRevealDirective, LinkTypeDirective, UiIconComponent],
  templateUrl: './split-showcase.component.html',
  styleUrl: './split-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
      style: 'display: contents',
  },
})
export class SplitShowcaseComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() description?: string;
  @Input() metas?: SplitShowcaseMetaItemI[];
  @Input() buttons?: UiLibButtonI[];
}

export interface SplitShowcaseMetaItemI {
  label: string;
  value: string;
}