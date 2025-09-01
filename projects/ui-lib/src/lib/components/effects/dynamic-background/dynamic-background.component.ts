import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'lib-dynamic-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-background.component.html',
  styleUrl: './dynamic-background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('bgCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;

  private sphere!: THREE.Mesh;
  private time = 0;

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initScene();
      this.animate();
      window.addEventListener('resize', this.onResize);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      cancelAnimationFrame(this.animationId);
      this.renderer.dispose();
      window.removeEventListener('resize', this.onResize);
    }
  }

  private initScene(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(width, height);

    // Luz para dar volumen
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    this.scene.add(light);

    // Geometría de esfera con muchos segmentos
    const geometry = new THREE.SphereGeometry(2, 128, 128);

    // Material con shading visible
    const material = new THREE.MeshNormalMaterial({ flatShading: true });

    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    this.time += 0.02;

    // deformamos vértices
    const positionAttr = this.sphere.geometry.attributes['position'] as THREE.BufferAttribute;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttr.count; i++) {
      vertex.fromBufferAttribute(positionAttr, i);

      // Distorsión progresiva
      const offset =
        Math.sin(vertex.x * 3 + this.time) * 0.2 +
        Math.cos(vertex.y * 5 + this.time * 0.7) * 0.2;

      vertex.normalize().multiplyScalar(2 + offset);

      positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    positionAttr.needsUpdate = true;
    this.sphere.geometry.computeVertexNormals();

    this.renderer.render(this.scene, this.camera);
  };

  private onResize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
}
