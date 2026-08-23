'use client'

import dynamic from 'next/dynamic'

/**
 * `ssr: false` dynamic imports are NOT allowed inside a Server Component,
 * so the WebGL ground is always mounted through this client wrapper.
 * The static ground colour on <html> covers the first paint.
 */
const ShaderBackground = dynamic(() => import('./ShaderBackground'), {
  ssr: false,
})

export default function ShaderBackgroundClient() {
  return <ShaderBackground />
}
