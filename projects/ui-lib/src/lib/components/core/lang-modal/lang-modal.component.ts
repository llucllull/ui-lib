import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-lang-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lang-modal.component.html',
  styleUrl: './lang-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangModalComponent {

}
