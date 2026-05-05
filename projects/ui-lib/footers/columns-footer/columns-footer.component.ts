import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibButtonI } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'lib-columns-footer',
    imports: [CommonModule, LinkTypeDirective],
    templateUrl: './columns-footer.component.html',
    styleUrl: './columns-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class ColumnsFooterComponent {
  @Input() columns?: ColumnsFooterItemI[];
  @Input() copyright?: ColumnsFooterCopyRightI;
}

export interface ColumnsFooterItemI {
  title: string;
  items: UiLibButtonI[];
}

export interface ColumnsFooterCopyRightI {
  year: string;
  name?: string;
  rights?: string;
}
