import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[scrollReveal]',
    standalone: true,
})
export class ScrollRevealDirective implements OnInit {
    @Input() distance = '30px';
    @Input() duration = '0.8s';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    ngOnInit() {
        this.setupInitialStyles();

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

    private setupInitialStyles() {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.el.nativeElement, 'transform', `translateY(-${this.distance})`);
        this.renderer.setStyle(
            this.el.nativeElement,
            'transition',
            `all ${this.duration} ease-out`,
        );
    }

    private reveal() {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
    }
}
