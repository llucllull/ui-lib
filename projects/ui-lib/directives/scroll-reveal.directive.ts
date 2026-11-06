import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Directive({
    selector: '[scrollReveal]',
    standalone: true,
})
export class ScrollRevealDirective implements OnInit {
    @Input() distance = '30px';
    @Input() duration = '0.8s';
    @Input() from: 'top' | 'bottom' | 'left' | 'right' = 'top';
    @Input() delay = 0;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {}

    ngOnInit() {
        this.setupInitialStyles();

        const isBrowser = isPlatformBrowser(this.platformId);
        const hasIntersectionObserver =
            typeof globalThis !== 'undefined' && 'IntersectionObserver' in globalThis;
        const prefersReducedMotion =
            isBrowser &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isBrowser || !hasIntersectionObserver || prefersReducedMotion) {
            if (prefersReducedMotion) {
                this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
            }
            this.reveal();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.reveal();
                        observer.unobserve(this.el.nativeElement);
                    }
                });
            },
            { threshold: 0.1 },
        ); // Se dispara cuando el 10% del componente es visible

        observer.observe(this.el.nativeElement);
    }

    private get isHorizontal(): boolean {
        return this.from === 'left' || this.from === 'right';
    }

    private setupInitialStyles() {
        const axis = this.isHorizontal ? 'X' : 'Y';
        const offset =
            this.from === 'bottom' || this.from === 'right'
                ? this.distance
                : `-${this.distance}`;

        this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.el.nativeElement, 'transform', `translate${axis}(${offset})`);
        this.renderer.setStyle(
            this.el.nativeElement,
            'transition',
            `opacity ${this.duration} ease-out ${this.delay}ms, transform ${this.duration} ease-out ${this.delay}ms`,
        );
    }

    private reveal() {
        const axis = this.isHorizontal ? 'X' : 'Y';

        this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        this.renderer.setStyle(this.el.nativeElement, 'transform', `translate${axis}(0)`);
    }
}
