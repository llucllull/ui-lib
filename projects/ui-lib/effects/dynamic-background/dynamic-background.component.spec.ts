import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicBackgroundComponent } from './dynamic-background.component';

describe('DynamicBackgroundComponent', () => {
  let component: DynamicBackgroundComponent;
  let fixture: ComponentFixture<DynamicBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicBackgroundComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the canvas without initializing WebGL during SSR', () => {
    expect(component).toBeTruthy();
    expect(component.isBrowser).toBe(false);
    expect(fixture.nativeElement.querySelector('canvas')).toBeTruthy();
  });
});
