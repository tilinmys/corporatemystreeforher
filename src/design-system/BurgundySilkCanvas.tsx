/**
 * Resize-safe WebGL royal purple, burgundy, and white silk background.
 *
 * - Fills its parent (parent must be `relative overflow-hidden`).
 * - A ResizeObserver on the PARENT card keeps canvas.width/height and
 *   u_resolution in sync on window resize and phone orientation change.
 * - UVs are aspect-corrected so silk folds keep the same organic proportions
 *   on a wide desktop hero and a narrow phone card (no stretching).
 * - DPR capped at 2; pauses off-screen; renders one still frame when the user
 *   prefers reduced motion; falls back to a CSS gradient without WebGL.
 */
import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_variant; // 0.0: hero, 1.0: card, 2.0: subtle

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.085;
  vec2 p = uv * 1.55;

  // Layered domain warping -> organic draped fabric folds
  for (int i = 1; i < 5; i++) {
    float fi = float(i);
    p.x += 0.42 / fi * sin(fi * p.y * 1.6 + t * fi + 0.4);
    p.y += 0.30 / fi * cos(fi * p.x * 1.25 + t * fi * 0.85 + 1.1);
  }

  float fold  = 0.5 + 0.5 * sin(p.x * 2.1 + p.y * 1.35);
  float sheen = pow(fold, 6.5);
  float shade = smoothstep(0.0, 0.85, fold);

  // Purple + White + Clinical Burgundy Color Palette
  vec3 deepPlum    = vec3(0.141, 0.024, 0.220); // #240638 (Deep Violet / Oxblood)
  vec3 royalPurple = vec3(0.345, 0.110, 0.529); // #581C87 (Royal Purple)
  vec3 burgundy    = vec3(0.392, 0.118, 0.169); // #641E2B (Clinical Burgundy)
  vec3 lilacGlow   = vec3(0.686, 0.450, 0.850); // Soft Lilac
  vec3 pureWhite   = vec3(0.985, 0.965, 0.995); // Iridescent Silk White

  vec3 col = mix(deepPlum, royalPurple, shade);
  col = mix(col, burgundy, smoothstep(0.3, 0.75, fold) * 0.45);
  col = mix(col, lilacGlow, smoothstep(0.55, 0.95, fold) * 0.4);
  col = mix(col, pureWhite, sheen * 0.65);

  // Soft vignette
  vec2 n = gl_FragCoord.xy / u_resolution.xy;
  col *= mix(0.75, 1.0, smoothstep(0.0, 0.75, n.y * 0.6 + n.x * 0.5));

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('BurgundySilkCanvas shader error:', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

export function BurgundySilkCanvas({
  className,
  variant = 'hero',
}: {
  className?: string
  variant?: 'hero' | 'card' | 'subtle'
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const prog = gl?.createProgram()
    if (!gl || !vs || !fs || !prog) {
      setFailed(true)
      return
    }
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true)
      return
    }
    gl.useProgram(prog)

    // One oversized triangle covers the viewport.
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_resolution')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uVar = gl.getUniformLocation(prog, 'u_variant')

    const variantVal = variant === 'hero' ? 0.0 : variant === 'card' ? 1.0 : 2.0
    gl.uniform1f(uVar, variantVal)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    let raf = 0
    let running = false
    let onScreen = true

    const render = (now: number) => {
      gl.uniform1f(uTime, reduceMotion ? 14 : (now - t0) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = (now: number) => {
      render(now)
      raf = requestAnimationFrame(loop)
    }
    const play = () => {
      if (running || reduceMotion || !onScreen) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = parent.getBoundingClientRect()
      const w = Math.max(1, Math.round(width * dpr))
      const h = Math.max(1, Math.round(height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
      render(performance.now()) // repaint immediately
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) play()
      else pause()
    })
    io.observe(parent)

    resize()
    play()

    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [variant])

  if (failed) {
    return (
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-[#240638] via-[#581C87] to-[#3D0E18]',
          className,
        )}
      />
    )
  }
  return <canvas ref={canvasRef} aria-hidden className={cn('absolute inset-0 block size-full', className)} />
}
