import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as THREE from 'three';
import { DynamicBackgroundComponent } from './dynamic-background.component';

vi.mock('three', () => {
  class Color {
    constructor(public value?: string) {}
  }

  class Scene {
    background: unknown;
    readonly objects: unknown[] = [];

    add = vi.fn((...objects: unknown[]) => {
      this.objects.push(...objects);
    });
  }

  class PerspectiveCamera {
    aspect = 1;
    position = { z: 0 };
    updateProjectionMatrix = vi.fn();
  }

  class WebGLRenderer {
    setSize = vi.fn();
    render = vi.fn();
    dispose = vi.fn();
  }

  class DirectionalLight {
    readonly position = {
      set: vi.fn(() => ({ normalize: vi.fn() })),
    };
  }

  class Vector3 {
    x = 1;
    y = 2;
    z = 3;

    fromBufferAttribute = vi.fn((attribute: any, index: number) => {
      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      return this;
    });
    normalize = vi.fn(() => this);
    multiplyScalar = vi.fn((scalar: number) => {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    });
  }

  class PositionAttribute {
    private readonly values = [
      [2, 0, 0],
      [0, 2, 0],
      [0, 0, 2],
    ];
    readonly count = this.values.length;
    version = 0;

    getX(index: number) {
      return this.values[index][0];
    }

    getY(index: number) {
      return this.values[index][1];
    }

    getZ(index: number) {
      return this.values[index][2];
    }

    setXYZ(index: number, x: number, y: number, z: number) {
      this.values[index] = [x, y, z];
    }

    set needsUpdate(value: boolean) {
      if (value) this.version++;
    }
  }

  class SphereGeometry {
    readonly type = 'SphereGeometry';
    readonly attributes = {
      position: new PositionAttribute(),
    };
    computeVertexNormals = vi.fn();
    dispose = vi.fn();
  }

  class Mesh {
    readonly isMesh = true;
    readonly rotation = { y: 0 };

    constructor(
      public geometry: unknown,
      public material: unknown,
    ) {}
  }

  class MeshStandardMaterial {
    readonly type = 'MeshStandardMaterial';
    dispose = vi.fn();
  }

  class MeshNormalMaterial {
    readonly type = 'MeshNormalMaterial';
    dispose = vi.fn();
  }

  return {
    Color,
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    DirectionalLight,
    Vector3,
    SphereGeometry,
    Mesh,
    MeshStandardMaterial,
    MeshNormalMaterial,
  };
});

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

describe('DynamicBackgroundComponent (browser)', () => {
  let component: DynamicBackgroundComponent;
  let fixture: ComponentFixture<DynamicBackgroundComponent>;
  const cancelFrame = vi.fn();

  beforeEach(async () => {
    TestBed.resetTestingModule();
    cancelFrame.mockClear();
    vi.stubGlobal('requestAnimationFrame', () => 42);
    vi.stubGlobal('cancelAnimationFrame', cancelFrame);

    await TestBed.configureTestingModule({
      imports: [DynamicBackgroundComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicBackgroundComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('initializes the scene, renderer and effect on the browser', () => {
    fixture.detectChanges();

    const renderer = (component as any).renderer;
    const scene = (component as any).scene;
    const effect = (component as any).currentEffect;

    expect(renderer).toBeInstanceOf(THREE.WebGLRenderer);
    expect(renderer.setSize).toHaveBeenCalledWith(window.innerWidth, window.innerHeight);
    expect(scene).toBeInstanceOf(THREE.Scene);
    expect(scene.background).toBeInstanceOf(THREE.Color);
    expect(scene.objects).toHaveLength(2);
    expect(renderer.render).toHaveBeenCalledWith(scene, (component as any).camera);
    expect((component as any).animationId).toBe(42);
    expect(effect).toBeTruthy();
    expect(effect.mesh.isMesh).toBe(true);
    expect(effect.mesh.geometry.type).toBe('SphereGeometry');
    expect(effect.mesh.geometry.attributes.position.count).toBeGreaterThan(0);
  });

  it('uses a standard material when elementColor is provided', () => {
    fixture.componentRef.setInput('elementColor', '#ff8800');
    fixture.detectChanges();

    const material = (component as any).currentEffect.mesh.material;
    expect(material.type).toBe('MeshStandardMaterial');
  });

  it('falls back to a normal material without elementColor', () => {
    fixture.detectChanges();

    const material = (component as any).currentEffect.mesh.material;
    expect(material.type).toBe('MeshNormalMaterial');
  });

  it('throws when the effect key is not registered', () => {
    fixture.componentRef.setInput('effect', 'unknown-effect');

    expect(() => fixture.detectChanges()).toThrow(/no está registrado/);
  });

  it('updates the camera and the renderer on resize', () => {
    fixture.detectChanges();

    const camera = (component as any).camera;
    const renderer = (component as any).renderer;
    const updateProjectionMatrix = vi.spyOn(camera, 'updateProjectionMatrix');
    renderer.setSize.mockClear();

    window.dispatchEvent(new Event('resize'));

    expect(camera.aspect).toBe(window.innerWidth / window.innerHeight);
    expect(updateProjectionMatrix).toHaveBeenCalled();
    expect(renderer.setSize).toHaveBeenCalledWith(window.innerWidth, window.innerHeight);
  });

  it('disposes the renderer and the effect on destroy', () => {
    fixture.detectChanges();

    const renderer = (component as any).renderer;
    const effect = (component as any).currentEffect;
    const geometryDispose = vi.spyOn(effect.mesh.geometry, 'dispose');
    const materialDispose = vi.spyOn(effect.mesh.material, 'dispose');

    component.ngOnDestroy();

    expect(cancelFrame).toHaveBeenCalledWith(42);
    expect(renderer.dispose).toHaveBeenCalled();
    expect(geometryDispose).toHaveBeenCalled();
    expect(materialDispose).toHaveBeenCalled();
  });
});
