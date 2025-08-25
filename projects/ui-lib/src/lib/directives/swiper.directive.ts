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
      ...this.swiperConfig,
    });
  }

  ngOnDestroy(): void {
    this.swiperInstance?.destroy(true, true);
  }
}
