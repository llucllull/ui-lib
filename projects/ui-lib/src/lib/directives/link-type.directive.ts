import { isPlatformBrowser } from '@angular/common';
import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    Input,
    OnInit,
    Output,
    PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { LinkType } from '../Enum/link-type.enum';

@Directive({
    selector: '[linkType]',
    standalone: true,
})
export class LinkTypeDirective implements OnInit {
    @Input() linkType?: LinkType;
    @Input() href?: string;
    @Output() anchorClicked = new EventEmitter<void>();

    private readonly platformId = inject(PLATFORM_ID);

    constructor(
        private readonly router: Router,
        private readonly elRef: ElementRef,
    ) {}

    ngOnInit(): void {
        this.setupLinkAttributes();
    }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        if (!this.linkType || !this.href) {
            this.disableLink();
            return;
        }

        event.preventDefault();

        switch (this.linkType) {
            case 'internal':
                this.navigateInternal(this.href);
                break;
            case 'external':
            case 'pdf':
                this.openExternal(this.href);
                break;
            case 'anchor':
                this.scrollToAnchor(this.href);
                break;
            case 'nolink':
                this.disableLink();
                break;
            default:
                console.warn(`Unsupported linkType: ${this.linkType}`);
        }
    }

    private setupLinkAttributes() {
        if (!this.linkType || !this.href) {
            this.disableLink();
            return;
        }

        this.elRef.nativeElement.setAttribute('href', this.href);

        if (this.linkType === 'external') {
            this.elRef.nativeElement.setAttribute('rel', 'nofollow');
        }
    }

    private navigateInternal(url: string) {
        const cleanedUrl = url.trim().replace(/\/+$/, '');
        this.anchorClicked.emit();
        this.router.navigateByUrl('/' + cleanedUrl);
    }

    private openExternal(url: string) {
        if (isPlatformBrowser(this.platformId)) {
            window.open(url, '_blank');
        }
    }

    private scrollToAnchor(id: string) {
        if (isPlatformBrowser(this.platformId)) {
            const el = document.getElementById(id);
            if (el) {
                const yOffset = -160;
                const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
                this.anchorClicked.emit();
            } else {
                console.warn(`Anchor "${id}" not found`);
            }
        }
    }

    private disableLink() {
        const element = this.elRef.nativeElement;
        const parentLi = element.closest('li');
        const isInMenu = parentLi?.classList.contains('menu-item-has-children');

        if (!isInMenu) {
            element.removeAttribute('href');
            element.setAttribute('aria-disabled', 'true');
            element.setAttribute('tabindex', '-1');
            element.style.cursor = 'default';
            element.style.pointerEvents = 'none';
        }
    }
}
export { LinkType };
