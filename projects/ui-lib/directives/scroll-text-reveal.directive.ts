import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

const CHAR_CLASS = 'text-reveal-char';
const PRIMARY_COLOR = 'var(--text-primary)';
const SECONDARY_COLOR = 'var(--text-primary-60)';

@Directive({
    selector: '[scrollTextReveal]',
    standalone: true,
})
export class ScrollTextRevealDirective implements OnInit, OnDestroy {
    private chars: HTMLElement[] = [];
    private revealedCount = 0;
    private frame: number | null = null;
    private observer: MutationObserver | null = null;
    private startScrollY: number | null = null;

    constructor(
        private readonly el: ElementRef<HTMLElement>,
        @Inject(PLATFORM_ID) private readonly platformId: Object,
    ) {}

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) return;

        const host = this.el.nativeElement;
        const reducedMotion =
            window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

        if (reducedMotion) {
            host.style.color = PRIMARY_COLOR;
            return;
        }

        this.observer = new MutationObserver(() => {
            this.observer?.disconnect();
            this.splitText();
            this.updateProgress();
            this.observer?.observe(host, { childList: true });
        });
        this.observer.observe(host, { childList: true });

        window.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onScroll, { passive: true });

        requestAnimationFrame(() => {
            this.splitText();
            this.updateProgress();
        });
    }

    ngOnDestroy() {
        if (!isPlatformBrowser(this.platformId)) return;

        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
        this.observer?.disconnect();

        if (this.frame !== null) {
            cancelAnimationFrame(this.frame);
            this.frame = null;
        }
    }

    updateProgress() {
        const total = this.chars.length;
        if (!total) return;

        const rect = this.el.nativeElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;

        if (this.startScrollY === null) {
            if (rect.bottom <= 0 || rect.top >= viewportHeight) return;
            this.startScrollY = window.scrollY;
        }

        const distance = Math.max(rect.height * 1.5, viewportHeight * 0.5) || 1;
        const progress = (window.scrollY - this.startScrollY) / distance;

        this.setRevealedCount(Math.round(Math.min(1, Math.max(0, progress)) * total));
    }

    private readonly onScroll = () => {
        if (this.frame !== null) return;

        this.frame = requestAnimationFrame(() => {
            this.frame = null;
            this.updateProgress();
        });
    };

    private setRevealedCount(target: number) {
        if (target === this.revealedCount) return;

        if (target > this.revealedCount) {
            for (let i = this.revealedCount; i < target; i++) {
                this.chars[i].style.color = PRIMARY_COLOR;
            }
        } else {
            for (let i = this.revealedCount - 1; i >= target; i--) {
                this.chars[i].style.color = SECONDARY_COLOR;
            }
        }

        this.revealedCount = target;
    }

    private splitText() {
        const host = this.el.nativeElement;

        if (!host.querySelector(`.${CHAR_CLASS}`)) {
            const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
            const textNodes: Text[] = [];

            while (walker.nextNode()) {
                const node = walker.currentNode as Text;
                if (node.textContent?.trim()) textNodes.push(node);
            }

            for (const node of textNodes) {
                const fragment = document.createDocumentFragment();

                for (const char of node.textContent ?? '') {
                    if (/\s/.test(char)) {
                        fragment.appendChild(document.createTextNode(char));
                        continue;
                    }

                    const span = document.createElement('span');
                    span.className = CHAR_CLASS;
                    span.style.color = SECONDARY_COLOR;
                    span.style.transition = 'color 0.18s ease';
                    span.textContent = char;
                    fragment.appendChild(span);
                }

                node.replaceWith(fragment);
            }
        }

        this.chars = Array.from(host.querySelectorAll<HTMLElement>(`.${CHAR_CLASS}`));
        this.revealedCount = 0;
    }
}
