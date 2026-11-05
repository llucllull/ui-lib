import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'ui-icon',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './ui-icon.component.html',
    styleUrls: ['./ui-icon.component.scss'],
})
export class UiIconComponent implements OnChanges {
    @Input() name!: string;
    @Input() size = 24;
    @Input() color = 'currentColor';

    private icon?: SimpleIcon | null;

    ngOnChanges() {
        this.resolveBrandIcon();
    }

    get isBrandIcon(): boolean {
        return !!this.icon;
    }

    get brandIcon(): SimpleIcon | null {
        return this.icon ?? null;
    }

    private resolveBrandIcon(): void {
        if (!this.name) {
            this.icon = null;
            return;
        }

        const key =
            'si' + this.name.replace(/[^a-z0-9]/gi, '').replace(/^\w/, (c) => c.toUpperCase());

        this.icon = (simpleIcons as any)[key] ?? null;
    }
}
