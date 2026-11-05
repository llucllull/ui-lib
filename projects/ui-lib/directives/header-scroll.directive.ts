import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[headerScroll]',
  standalone: true,
})
export class HeaderScrollDirective {
  @Input() scrollThreshold = 60;

  @HostBinding('class.is-scrolled') isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > this.scrollThreshold;
  }
}