import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import {
    ArrowDownRight,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    ArrowUp,
    Home,
    Linkedin,
    LUCIDE_ICONS,
    LucideAngularModule,
    LucideIconProvider,
    Mail,
    Moon,
    MoveRight,
    Sun,
} from 'lucide-angular';
import type { SimpleIcon } from 'simple-icons';
import { siGithub } from 'simple-icons';

const brandIcons: Record<string, SimpleIcon> = {
    siGithub,
};

@Component({
    selector: 'ui-icon',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    providers: [
        {
            provide: LUCIDE_ICONS,
            multi: true,
            useValue: new LucideIconProvider({
                ArrowLeft,
                ArrowRight,
                ArrowUp,
                ArrowUpRight,
                ArrowDownRight,
                Home,
                Linkedin,
                Mail,
                Moon,
                MoveRight,
                Sun,
            }),
        },
    ],
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

        this.icon = brandIcons[key] ?? null;
    }
}
