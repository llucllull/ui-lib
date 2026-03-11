// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DynamicBackgroundComponent } from './dynamic-background.component';
// import { DynamicEffect } from './effects/dynamic-effect.interface';
// import { EFFECT_REGISTRY } from './effects/effect-registry';

// class MockEffect implements DynamicEffect {
//     init = jasmine.createSpy('init');
//     animate = jasmine.createSpy('animate');
//     dispose = jasmine.createSpy('dispose');
// }

// describe('DynamicBackgroundComponent', () => {
//     let component: DynamicBackgroundComponent;
//     let fixture: ComponentFixture<DynamicBackgroundComponent>;

//     beforeEach(async () => {
//         // Registrar efecto mock
//         (EFFECT_REGISTRY as any)['sphere-deform'] = MockEffect;

//         await TestBed.configureTestingModule({
//             imports: [DynamicBackgroundComponent],
//         }).compileComponents();

//         fixture = TestBed.createComponent(DynamicBackgroundComponent);
//         component = fixture.componentInstance;

//         // Evita crear WebGL real
//         spyOn<any>(component, 'initScene').and.callFake(() => {
//             (component as any).currentEffect = new MockEffect();
//             (component as any).currentEffect.init();
//         });

//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should render a canvas element', () => {
//         const canvas = fixture.nativeElement.querySelector('canvas');
//         expect(canvas).toBeTruthy();
//     });

//     it('should load and init effect on init', () => {
//         component.ngOnInit();

//         expect((component as any).currentEffect).toBeTruthy();
//         expect((component as any).currentEffect.init).toHaveBeenCalled();
//     });

//     it('should call animate on currentEffect', () => {
//         const effect = (component as any).currentEffect as MockEffect;

//         component['animate']();

//         expect(effect.animate).toHaveBeenCalled();
//     });

//     it('should dispose effect on destroy', () => {
//         const effect = (component as any).currentEffect as MockEffect;
//         const spyCancel = spyOn(window, 'cancelAnimationFrame');

//         component['animationId'] = 123;

//         component.ngOnDestroy();

//         expect(spyCancel).toHaveBeenCalledWith(123);
//         expect(effect.dispose).toHaveBeenCalled();
//     });
// });
