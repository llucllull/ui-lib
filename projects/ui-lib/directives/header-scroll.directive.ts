import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[headerScroll]',
  standalone: true,
})
export class HeaderScrollDirective implements AfterViewInit {
  @Input() scrollThreshold = 60;

  @HostBinding('class.is-scrolled') isScrolled = false;
  @HostBinding('class.is-over-light') isOverLight = false;
  @HostBinding('class.is-over-dark') isOverDark = false;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngAfterViewInit(): void {
    this.updateHeaderState();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.updateHeaderState();
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateHeaderState();
  }

  private updateHeaderState(): void {
    if (!this.isBrowser) return;

    this.isScrolled = window.scrollY > this.scrollThreshold;
    this.updateBackgroundTone();
  }

  private updateBackgroundTone(): void {
    const header = this.elementRef.nativeElement;
    const { bottom, height, left, right, top } = header.getBoundingClientRect();
    if (height === 0 || typeof document.elementsFromPoint !== 'function') return;

    const pointX = (left + right) / 2;
    const pointY = Math.max(top + 1, bottom - 1);
    const backgroundColor = document
      .elementsFromPoint(pointX, pointY)
      .filter((element) => !header.contains(element))
      .map((element) => getComputedStyle(element).backgroundColor)
      .find((color) => this.getOpaqueRgb(color));

    const rgb = backgroundColor && this.getOpaqueRgb(backgroundColor);
    if (!rgb) return;

    this.isOverLight = this.isLightColor(rgb);
    this.isOverDark = !this.isOverLight;
  }

  private getOpaqueRgb(color: string): [number, number, number] | undefined {
    const channels = color.match(/[\d.]+/g)?.map(Number);
    if (!channels || channels.length < 3 || (channels[3] !== undefined && channels[3] === 0)) {
      return undefined;
    }

    return [channels[0], channels[1], channels[2]];
  }

  private isLightColor([red, green, blue]: [number, number, number]): boolean {
    const perceivedBrightness = Math.sqrt(
      0.299 * red ** 2 + 0.587 * green ** 2 + 0.114 * blue ** 2,
    );

    return perceivedBrightness >= 128;
  }
}
