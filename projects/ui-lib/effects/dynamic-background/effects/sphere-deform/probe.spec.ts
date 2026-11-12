import type * as THREE from 'three';
import { SphereDeformEffect } from './sphere-deform.effect';
import { describe, expect, it } from 'vitest';

describe('SphereDeformEffect initialization', () => {
  it('adds a mesh with sphere geometry and a normal material', () => {
    const scene = {
      children: [] as unknown[],
      add(...objects: unknown[]) {
        this.children.push(...objects);
      },
    };
    const effect = new SphereDeformEffect(2, 0.01);

    effect.init(scene as unknown as THREE.Scene, {});

    expect(scene.children).toHaveLength(1);
    const mesh = scene.children[0] as {
      isMesh: boolean;
      geometry: { type: string };
      material: { type: string };
    };
    expect(mesh.isMesh).toBe(true);
    expect(mesh.geometry.type).toBe('SphereGeometry');
    expect(mesh.material.type).toBe('MeshNormalMaterial');
  });
});
