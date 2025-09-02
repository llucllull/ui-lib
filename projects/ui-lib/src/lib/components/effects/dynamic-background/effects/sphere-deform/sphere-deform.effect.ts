import * as THREE from 'three';
import { DynamicEffect } from '../dynamic-effect.interface';

export class SphereDeformEffect implements DynamicEffect {
  private mesh!: THREE.Mesh;
  private time = 0;

  constructor(
    private size: number,
    private rotationSpeed: number,
    private color?: string,
  ) {}

  init(scene: THREE.Scene, _options: any): void {
    const geometry = new THREE.SphereGeometry(this.size, 128, 128);

    const material = this.color
      ? new THREE.MeshStandardMaterial({ color: this.color, flatShading: true })
      : new THREE.MeshNormalMaterial({ flatShading: true });

    this.mesh = new THREE.Mesh(geometry, material);
    scene.add(this.mesh);
  }

  animate(): void {
    this.time += 0.02;
    const positionAttr = this.mesh.geometry.attributes['position'] as THREE.BufferAttribute;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttr.count; i++) {
      vertex.fromBufferAttribute(positionAttr, i);

      const offset =
        Math.sin(vertex.x * 3 + this.time) * 0.2 +
        Math.cos(vertex.y * 5 + this.time * 0.7) * 0.2;

      vertex.normalize().multiplyScalar(this.size + offset);

      positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    positionAttr.needsUpdate = true;
    this.mesh.geometry.computeVertexNormals();

    this.mesh.rotation.y += this.rotationSpeed;
  }

  dispose(): void {
    this.mesh?.geometry.dispose();
    (this.mesh?.material as THREE.Material)?.dispose();
  }
}
