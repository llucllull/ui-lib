import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';
import { IconsModule } from '../../../modules';

@Component({
    selector: 'ui-icon',
    standalone: true,
    imports: [CommonModule, IconsModule],
    templateUrl: './ui-icon.component.html',
    styleUrls: ['./ui-icon.component.scss'],
})
export class UiIconComponent {
    @Input() name!: string;
    @Input() size = 24;
    @Input() color = 'currentColor';

    private icon?: SimpleIcon | null;

    ngOnChanges() {
        this.icon = this.resolveBrandIcon();
    }

    get isBrandIcon(): boolean {
        return !!this.icon;
    }

    get brandIcon(): SimpleIcon | null {
        return this.icon ?? null;
    }

    private resolveBrandIcon(): SimpleIcon | null {
        if (!this.name) return null;

        const key =
            'si' + this.name.replace(/[^a-z0-9]/gi, '').replace(/^\w/, (c) => c.toUpperCase());

        return (simpleIcons as any)[key] ?? null;
    }
}
