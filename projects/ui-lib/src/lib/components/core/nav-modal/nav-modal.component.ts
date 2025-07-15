import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-nav-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-modal.component.html',
  styleUrl: './nav-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavModalComponent {

}
