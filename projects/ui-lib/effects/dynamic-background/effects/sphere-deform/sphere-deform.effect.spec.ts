import type * as THREE from 'three';
import { SphereDeformEffect } from './sphere-deform.effect';

const createScene = () => {
  const children: unknown[] = [];
  return {
    children,
    add: (...objects: unknown[]) => children.push(...objects),
  };
};

describe('SphereDeformEffect', () => {
  it('builds a standard material when a color is provided', () => {
    const scene = createScene();
    const effect = new SphereDeformEffect(2, 0.01, '#ff0000');

    effect.init(scene as unknown as THREE.Scene, {});

    expect(scene.children).toHaveLength(1);
    const mesh = scene.children[0] as {
      material: { type: string };
      geometry: { type: string };
    };
    expect(mesh.material.type).toBe('MeshStandardMaterial');
    expect(mesh.geometry.type).toBe('SphereGeometry');
  });

  it('builds a normal material when no color is provided', () => {
    const scene = createScene();
    const effect = new SphereDeformEffect(2, 0.01);

    effect.init(scene as unknown as THREE.Scene, {});

    const mesh = scene.children[0] as { material: { type: string } };
    expect(mesh.material.type).toBe('MeshNormalMaterial');
  });

  it('deforms the vertices around the configured size and rotates the mesh', () => {
    const scene = createScene();
    const rotationSpeed = 0.05;
    const effect = new SphereDeformEffect(2, rotationSpeed);

    effect.init(scene as unknown as THREE.Scene, {});

    const mesh = scene.children[0] as {
      geometry: { attributes: { position: THREE.BufferAttribute } };
      rotation: { y: number };
    };
    const position = mesh.geometry.attributes.position;
    const originalVersion = position.version;

    effect.animate();

    expect(mesh.rotation.y).toBeCloseTo(rotationSpeed);
    expect(position.version).toBe(originalVersion + 1);

    const step = Math.ceil(position.count / 5);
    for (let i = 0; i < position.count; i += step) {
      const radius = Math.hypot(position.getX(i), position.getY(i), position.getZ(i));
      expect(radius).toBeGreaterThan(1.4);
      expect(radius).toBeLessThan(2.6);
    }
  });

  it('disposes the geometry and the material', () => {
    const scene = createScene();
    const effect = new SphereDeformEffect(2, 0.01, '#00ff00');

    effect.init(scene as unknown as THREE.Scene, {});

    const mesh = scene.children[0] as {
      geometry: THREE.SphereGeometry;
      material: THREE.Material;
    };
    const geometryDispose = vi.spyOn(mesh.geometry, 'dispose');
    const materialDispose = vi.spyOn(mesh.material as THREE.Material, 'dispose');

    effect.dispose();

    expect(geometryDispose).toHaveBeenCalled();
    expect(materialDispose).toHaveBeenCalled();
  });

  it('does not throw when disposed before init', () => {
    const effect = new SphereDeformEffect(2, 0.01);

    expect(() => effect.dispose()).not.toThrow();
  });
});
