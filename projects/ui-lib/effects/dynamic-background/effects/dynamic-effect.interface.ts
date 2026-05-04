import * as THREE from 'three';

export interface DynamicEffect {
    init(scene: THREE.Scene, options: any): void;
    animate(): void;
    dispose(): void;
}
