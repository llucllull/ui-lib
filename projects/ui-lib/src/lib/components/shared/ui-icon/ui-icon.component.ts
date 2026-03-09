import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { siFacebook, siInstagram, siTiktok, siX, siYoutube } from 'simple-icons';
import { IconsModule } from '../../../modules';

import type { SimpleIcon } from 'simple-icons';

const brandIcons: Record<string, SimpleIcon> = {
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
    imports: [CommonModule, IconsModule],
    templateUrl: './ui-icon.component.html',
    styleUrls: ['./ui-icon.component.scss'],
})
export class UiIconComponent {
    @Input() name!: string;
    @Input() size: number = 24;
    @Input() color: string = 'currentColor';

    private get iconKey(): string {
        return this.name?.toLowerCase() ?? '';
    }

    get isBrandIcon(): boolean {
        return !!brandIcons[this.iconKey];
    }

    get brandIcon(): SimpleIcon | undefined {
        return brandIcons[this.iconKey];
    }
}
