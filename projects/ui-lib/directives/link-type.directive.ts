import { isPlatformBrowser } from '@angular/common';
import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    Output,
    PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { LinkType } from '@lluc_llull/ui-lib/enums';

@Directive({
    selector: '[linkType]',
    standalone: true,
})
export class LinkTypeDirective {
    private _linkType?: LinkType;
    private _href?: string;

    @Input() 
    set linkType(value: LinkType | undefined) {
        this._linkType = value;
        this.updateElementAttributes();
    }
    get linkType(): LinkType | undefined { return this._linkType; }

    @Input() 
    set href(value: string | undefined) {
        this._href = value;
        this.updateElementAttributes();
    }
    get href(): string { return this._href ?? ''; }

    @Output() anchorClicked = new EventEmitter<void>();

    constructor(
        private readonly router: Router,
        private readonly elRef: ElementRef<HTMLAnchorElement>,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {}

    get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        if (!this.linkType || !this.href) return;

        switch (this.linkType) {
            case 'internal':
                event.preventDefault();
                const targetUrl = this.elRef.nativeElement.getAttribute('href') ?? this.href;
                this.router.navigateByUrl(targetUrl);
                this.anchorClicked.emit();
                break;

            case 'anchor':
                event.preventDefault();
                this.scrollToAnchor(this.href);
                break;

            case 'nolink':
                event.preventDefault();
                break;

            case 'external':
            case 'pdf':
            default:
                break;
        }
    }

    private updateElementAttributes(): void {
        const element = this.elRef.nativeElement;
        if (!this.href) {
            element.removeAttribute('href');
            return;
        }

        const resolvedHref = this.resolveHref();
        element.setAttribute('href', resolvedHref);

        if (this.linkType === 'external' || this.linkType === 'pdf') {
            element.setAttribute('target', '_blank');
            element.setAttribute('rel', 'noopener noreferrer nofollow');
        } else {
            element.removeAttribute('target');
            element.removeAttribute('rel');
        }
    }

    private resolveHref(): string {
        if (this.href.startsWith('/') || this.href.startsWith('http') || this.href.startsWith('#')) {
            return this.href;
        }

        if (this.linkType === 'internal') {
            const lang = this.getCurrentLang();
            return `/${lang}/${this.href}`;
        }

        return this.href;
    }

    private getCurrentLang(): string {
        const url = this.router.url || '';
        const firstSegment = url.split('?')[0].split('#')[0].split('/')[1];
        return firstSegment || 'es';
    }

    private scrollToAnchor(id: string): void {
        if (!this.isBrowser) return;

        const cleanId = id.replace(/^#/, '');
        const el = document.getElementById(cleanId);
        if (!el) return;

        const yOffset = -160;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({
            top: y,
            behavior: 'smooth',
        });

        this.anchorClicked.emit();
    }
}
export { LinkType };