import { isPlatformBrowser } from '@angular/common';
import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnInit,
    Output,
    PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { LinkType } from '@lluc_llull/ui-lib/enums';

@Directive({
    selector: '[linkType]',
    standalone: true,
})
export class LinkTypeDirective implements OnInit {
    @Input() linkType?: LinkType;
    @Input() href?: string;
    @Output() anchorClicked = new EventEmitter<void>();

    constructor(
        private readonly router: Router,
        private readonly elRef: ElementRef<HTMLAnchorElement>,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {}

    get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        this.setupAttributes();
    }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        if (!this.linkType || !this.href) return;

        switch (this.linkType) {
            case 'internal':
                event.preventDefault();
                this.navigateInternal(this.href);
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

    private setupAttributes(): void {
        const element = this.elRef.nativeElement;
        const resolvedHref = this.resolveHref();

        if (!resolvedHref) return;

        element.setAttribute('href', resolvedHref);

        if (this.linkType === 'external' || this.linkType === 'pdf') {
            element.setAttribute('target', '_blank');
            element.setAttribute('rel', 'noopener noreferrer nofollow');
        }
    }

    private resolveHref(): string {
        if (!this.href) return '';

        // si ya es absoluta, no tocarla
        if (this.href.startsWith('/')) {
            return this.href;
        }

        if (this.linkType === 'internal') {
            const lang = this.getCurrentLang();
            return `/${lang}/${this.href}`;
        }

        return this.href;
    }

    private navigateInternal(url: string): void {
        // si ya es absoluta, navega directamente
        if (url.startsWith('/')) {
            this.router.navigateByUrl(url);
            return;
        }

        const lang = this.getCurrentLang();

        this.anchorClicked.emit();
        this.router.navigate(['/', lang, url]);
    }

    private getCurrentLang(): string {
        const firstSegment = this.router.url.split('?')[0].split('#')[0].split('/')[1];
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

