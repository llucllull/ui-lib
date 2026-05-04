import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[highlight]',
    standalone: true,
})
export class HighlightDirective {
    @Input('highlight') highlightColor: string = '#FFFFFF';
    @Input() highlightThickness: number = 20;

    @HostBinding('style.background-image')
    get background() {
        const start = 65;
        const end = start + this.highlightThickness;

        return `linear-gradient(to bottom, 
      transparent ${start}%, 
      ${this.highlightColor} ${start}%, 
      ${this.highlightColor} ${end}%, 
      transparent ${end}%)`;
    }

    @HostBinding('style.background-size') size = '100% 100%';
    @HostBinding('style.display') display = 'inline';

    // desplazamiento
    @HostBinding('style.padding') padding = '0 10px';
    @HostBinding('style.margin') margin = '0 -10px'; // Compensa el padding para no mover el texto
    @HostBinding('style.box-decoration-break') break = 'clone';
    @HostBinding('style.-webkit-box-decoration-break') wBreak = 'clone';
}
