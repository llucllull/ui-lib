import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as THREE from 'three';
import { DynamicBackgroundComponent } from './dynamic-background.component';
import { DynamicEffect } from './effects/dynamic-effect.interface';
import { EFFECT_REGISTRY } from './effects/effect-registry';

// Mock renderer (evita WebGL en CI)
beforeAll(() => {
    spyOn(THREE, 'WebGLRenderer').and.returnValue({
        setSize: () => {},
        setPixelRatio: () => {},
        render: () => {},
        dispose: () => {},
        domElement: document.createElement('canvas'),
    } as any);
});

// Mock de efecto sencillo para testing
class MockEffect implements DynamicEffect {
    init = jasmine.createSpy('init');
    animate = jasmine.createSpy('animate');
    dispose = jasmine.createSpy('dispose');
}

describe('DynamicBackgroundComponent', () => {
    let component: DynamicBackgroundComponent;
    let fixture: ComponentFixture<DynamicBackgroundComponent>;

    beforeEach(async () => {
        (EFFECT_REGISTRY as any)['sphere-deform'] = MockEffect;

        await TestBed.configureTestingModule({
            imports: [DynamicBackgroundComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicBackgroundComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a canvas element', () => {
        const canvas = fixture.nativeElement.querySelector('canvas');
        expect(canvas).toBeTruthy();
    });

    it('should load and init the effect on init', () => {
        const spyInitScene = spyOn<any>(component as any, 'initScene').and.callThrough();

        component.ngOnInit();

        expect(spyInitScene).toHaveBeenCalled();
        expect((component as any).currentEffect.init).toHaveBeenCalled();
    });

    it('should call animate on currentEffect in animation loop', () => {
        const effect = (component as any).currentEffect as MockEffect;

        component['animate']();

        expect(effect.animate).toHaveBeenCalled();
    });

    it('should cancel animation frame and dispose effect on destroy', () => {
        const effect = (component as any).currentEffect as MockEffect;
        const spyCancel = spyOn(window, 'cancelAnimationFrame');

        component['animationId'] = 123;
        component['renderer'] = { dispose: () => {} } as any;

        component.ngOnDestroy();

        expect(spyCancel).toHaveBeenCalledWith(123);
        expect(effect.dispose).toHaveBeenCalled();
    });
});
