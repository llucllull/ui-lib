import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective } from '../../../../directives';
import { UiLibButtonI } from '../../../../interfaces';

@Component({
  selector: 'lib-links-footer',
  standalone: true,
  imports: [CommonModule, LinkTypeDirective],
  templateUrl: './links-footer.component.html',
  styleUrl: './links-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksFooterComponent {
    @Input() links?: UiLibButtonI[];
}
