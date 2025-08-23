import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLibButtonI } from '../../../interfaces';
import { LinkTypeDirective } from '../../../directives';

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
