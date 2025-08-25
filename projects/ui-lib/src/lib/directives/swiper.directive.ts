import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay]);

@Directive({
  selector: '[appSwiper]',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit, OnDestroy {
  @Input() swiperConfig: any;

  private swiperInstance?: Swiper;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.swiperInstance = new Swiper(this.el.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: { clickable: true },
      breakpoints: {
        0: { slidesPerView: 2 },      // móviles
        480: { slidesPerView: 3 },    // small tablets
        768: { slidesPerView: 4 },    // tablets
        1024: { slidesPerView: 5 },   // laptops
        1280: { slidesPerView: 6 },   // desktop → máximo 7
      },
      ...this.swiperConfig,
    });
  }

  ngOnDestroy(): void {
    this.swiperInstance?.destroy(true, true);
  }
}
