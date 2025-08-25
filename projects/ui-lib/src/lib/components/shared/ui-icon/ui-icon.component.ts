import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Lucide
import { LucideAngularModule } from 'lucide-angular';

// SimpleIcons
import {
  siInstagram,
  siFacebook,
  siTiktok,
  siYoutube,
  siX, // Twitter/X
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
  selector: 'lib-ui-icon',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ui-icon.component.html',
  styleUrl: './ui-icon.component.scss'
})
export class UiIconComponent {
  @Input() name!: string;
  @Input() size?: number = 24; 
  @Input() color?: string = 'currentColor';

  get isBrandIcon(): boolean {
    return !!brandIcons[this.name?.toLowerCase()];
  }

  get brandSvg(): string | null {
    return this.isBrandIcon ? brandIcons[this.name.toLowerCase()].svg : null;
  }
}
