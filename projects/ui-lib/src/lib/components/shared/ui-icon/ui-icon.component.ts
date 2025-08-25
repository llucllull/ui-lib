import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {
  siInstagram,
  siFacebook,
  siTiktok,
  siYoutube,
  siX,
} from 'simple-icons';

const brandIcons: Record<string, any> = {
  instagram: siInstagram,
  facebook: siFacebook,
  tiktok: siTiktok,
  youtube: siYoutube,
  twitter: siX,
  x: siX,
};

@Component({
  selector: 'ui-icon',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ui-icon.component.html',
  styleUrls: ['./ui-icon.component.scss'],
})
export class UiIconComponent {
  @Input() name!: string;
  @Input() size: number = 24;
  @Input() color: string = 'currentColor';

  get isBrandIcon(): boolean {
    return !!brandIcons[this.name?.toLowerCase()];
  }

  get brandIcon(): any {
    return brandIcons[this.name?.toLowerCase()];
  }
}
