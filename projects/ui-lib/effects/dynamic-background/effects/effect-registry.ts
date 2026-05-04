import { DynamicEffect } from './dynamic-effect.interface';
import { SphereDeformEffect } from './sphere-deform/sphere-deform.effect';
// import { RingTransformEffect } from './ring-transform/ring-transform.effect';
// import { ParticlesEffect } from './particles/particles.effect';

export type EffectKey = 'sphere-deform' | 'ring-transform' | 'particles';

export const EFFECT_REGISTRY: Partial<Record<EffectKey, new (...args: any[]) => DynamicEffect>> = {
    'sphere-deform': SphereDeformEffect,
    // 'ring-transform': RingTransformEffect,
    // 'particles': ParticlesEffect,
};
