import * as THREE_SPEC from 'three';
import { SphereDeformEffect } from './sphere-deform.effect';
import { describe, expect, it } from 'vitest';

describe('probe', () => {
    it('which three copies are in play', () => {
        const scene = new THREE_SPEC.Scene();
        const effect = new SphereDeformEffect(2, 0.01, '#fff');
        effect.init(scene, {});
        const mesh: any = scene.children[0];
        console.log('SPEC REVISION:', (THREE_SPEC as any).REVISION);
        console.log('same Scene class:', scene.constructor === THREE_SPEC.Scene);
        console.log(
            'mesh ctor === spec Mesh:',
            mesh.constructor === THREE_SPEC.Mesh,
            '| mesh ctor name:',
            mesh.constructor.name,
        );
        console.log('material type:', mesh.material.type);
        expect(true).toBe(true);
    });
});
