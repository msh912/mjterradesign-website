'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScreenQuad } from '@react-three/drei'
import * as THREE from 'three'
import { clamp, damp } from '@/lib/utils'

/**
 * Living ground. A fullscreen fbm-noise field whose palette is driven by a
 * `uScroll` uniform eased toward the page's scroll ratio — the background
 * shifts colour as you travel down the site. Sections above it stay
 * transparent so this reads through.
 *
 * Must be mounted through ShaderBackgroundClient (ssr:false dynamic import
 * is illegal directly inside a Server Component).
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uRes;
  uniform vec3  uDeep;
  uniform vec3  uMid;
  uniform vec3  uGlow;
  uniform vec3  uEmber;

  // -- cheap value noise -----------------------------------------------------
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p = rot * p * 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x / max(uRes.y, 1.0), 1.0);

    float t = uTime * 0.045;

    // Domain-warped fbm — slow, liquid, never loops visibly.
    vec2 q = vec2(fbm(p * 1.6 + vec2(0.0, t)), fbm(p * 1.6 + vec2(5.2, -t)));
    vec2 r = vec2(
      fbm(p * 1.6 + 3.4 * q + vec2(1.7, 9.2) + t * 0.7),
      fbm(p * 1.6 + 3.4 * q + vec2(8.3, 2.8) - t * 0.6)
    );
    float f = fbm(p * 1.6 + 3.2 * r);

    // Palette travels with scroll: deep -> mid -> glow.
    float s = clamp(uScroll, 0.0, 1.0);
    vec3 base = mix(uDeep, uMid, smoothstep(0.0, 0.62, s));
    base = mix(base, uGlow, smoothstep(0.55, 1.0, s) * 0.55);

    vec3 col = mix(base * 0.72, base, smoothstep(0.25, 0.85, f));

    // Accent filaments where the field folds on itself.
    float filament = smoothstep(0.62, 0.98, f + length(r) * 0.35);
    col += uGlow * filament * (0.14 + 0.16 * s);

    // A single ochre bloom, low and off-centre — the <5% counterpoint.
    float bloom = smoothstep(0.85, 0.0, length(p - vec2(0.42, -0.30 + s * 0.5)));
    col += uEmber * bloom * 0.05;

    // Vignette keeps type legible at the edges.
    float vig = smoothstep(1.35, 0.28, length(p));
    col *= mix(0.68, 1.0, vig);

    // Dither out the banding a smooth gradient always shows on dark screens.
    float dither = (hash(uv * uRes) - 0.5) / 255.0;
    col += dither;

    gl_FragColor = vec4(col, 1.0);
  }
`

function Field() {
  const material = useRef<THREE.ShaderMaterial>(null)
  const scroll = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      // Kept in sync with the OKLCH tokens in globals.css.
      uDeep: { value: new THREE.Color('#0b1a15') },
      uMid: { value: new THREE.Color('#102b23') },
      uGlow: { value: new THREE.Color('#3fd08a') },
      uEmber: { value: new THREE.Color('#d08a3a') },
    }),
    [],
  )

  useFrame((state, delta) => {
    const m = material.current
    if (!m) return

    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    const target = max > 0 ? clamp(0, window.scrollY / max, 1) : 0
    scroll.current += (target - scroll.current) * damp(delta, 3.2)

    m.uniforms.uTime.value = state.clock.elapsedTime
    m.uniforms.uScroll.value = scroll.current
    m.uniforms.uRes.value.set(state.size.width, state.size.height)
  })

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  )
}

export default function ShaderBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ zIndex: 'var(--z-backdrop)' }}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <Field />
      </Canvas>
    </div>
  )
}
