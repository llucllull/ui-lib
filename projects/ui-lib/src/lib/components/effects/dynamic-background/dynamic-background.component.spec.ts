import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicBackgroundComponent } from './dynamic-background.component';

describe('DynamicBackgroundComponent', () => {
  let component: DynamicBackgroundComponent;
  let fixture: ComponentFixture<DynamicBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicBackgroundComponent);
    component = fixture.componentInstance;

    spyOn<any>(component as any, 'initScene').and.callFake(() => {});
    spyOn<any>(component as any, 'animate').and.callFake(() => {});
    spyOn(window, 'addEventListener').and.callFake(() => {});
    spyOn(window, 'removeEventListener').and.callFake(() => {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a canvas element in the template', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should call initScene on init (browser only)', () => {
    const spyInit = spyOn<any>(component as any, 'initScene');
    component.ngOnInit();
    expect(spyInit).toHaveBeenCalled();
  });

  it('should cancel animation frame on destroy', () => {
    const spyCancel = spyOn(window, 'cancelAnimationFrame');
    component['animationId'] = 123;
    component.ngOnDestroy();
    expect(spyCancel).toHaveBeenCalledWith(123);
  });
});
