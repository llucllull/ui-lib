import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLibAddressI, UiLibButtonI, UiLibImageI } from '../../../interfaces';
import { LinkTypeDirective } from "ui-lib";

@Component({
  selector: 'lib-visual-footer',
  standalone: true,
  imports: [CommonModule, LinkTypeDirective],
  templateUrl: './visual-footer.component.html',
  styleUrl: './visual-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualFooterComponent {
  @Input() contactTitle?: string;
  @Input() contactPhone?: UiLibButtonI;
  @Input() contactEmail?: UiLibButtonI;
  @Input() addressTitle?: string;
  @Input() address?: UiLibAddressI;
  @Input() socialsTitle?: string;
  @Input() socials?: UiLibButtonI[];
  @Input() image?: UiLibImageI;
}
