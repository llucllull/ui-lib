import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LangModalComponent } from "../lang-modal";
import { NavModalComponent } from "../nav-modal";

@Component({
  selector: 'lib-header-clear',
  standalone: true,
  imports: [CommonModule, LangModalComponent, NavModalComponent],
  templateUrl: './header-clear.component.html',
  styleUrl: './header-clear.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderClearComponent {

}
