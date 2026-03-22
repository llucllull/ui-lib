import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { DynamicEffect } from './effects/dynamic-effect.interface';
import { EFFECT_REGISTRY, EffectKey } from './effects/effect-registry';

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

    @Input() effect: EffectKey = 'sphere-deform';
    @Input() rotationSpeed = 0.01;
    @Input() size = 2;
    @Input() backgroundColor = '#000000';
    @Input() elementColor?: string;

    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private animationId!: number;

    private currentEffect!: DynamicEffect;

    constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

    get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        if (this.isBrowser) {
            this.initScene();
            this.loadEffect();
            this.animate();
            window.addEventListener('resize', this.onResize);
        }
    }

    ngOnDestroy(): void {
        if (this.isBrowser) {
            cancelAnimationFrame(this.animationId);
            this.renderer?.dispose();
            this.currentEffect?.dispose();
            window.removeEventListener('resize', this.onResize);
        }
    }

    private initScene(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.backgroundColor);

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvasRef.nativeElement,
            antialias: true,
        });
        this.renderer.setSize(width, height);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        this.scene.add(light);
    }

    private loadEffect(): void {
        const EffectClass = EFFECT_REGISTRY[this.effect];
        if (!EffectClass) {
            throw new Error(`Efecto "${this.effect}" no está registrado en EFFECT_REGISTRY`);
        }
        this.currentEffect = new EffectClass(this.size, this.rotationSpeed, this.elementColor);
        this.currentEffect.init(this.scene, {});
    }

    private animate = (): void => {
        this.animationId = requestAnimationFrame(this.animate);
        this.currentEffect.animate();
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
