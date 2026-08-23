export type ClassValue = string | number | null | undefined | false | ClassValue[]

/** Join class names, skipping falsy values. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = []
  for (const v of values) {
    if (!v && v !== 0) continue
    if (Array.isArray(v)) {
      const nested = cn(...v)
      if (nested) out.push(nested)
    } else {
      out.push(String(v))
    }
  }
  return out.join(' ')
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const clamp = (min: number, value: number, max: number) =>
  Math.max(min, Math.min(value, max))

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  if (inMax === inMin) return outMin
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

/** Frame-rate independent lerp factor. */
export const damp = (delta: number, smoothing: number) =>
  1 - Math.exp(-smoothing * delta)
