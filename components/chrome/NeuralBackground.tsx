'use client'

import { useEffect, useRef } from 'react'

/**
 * Faithful port of the UC·AI offline design's hero background motion:
 * additive glow blobs that track the mouse + a rotating 3D particle field
 * that morphs toward per-section shapes (brain / NZ / koru / AI) and is
 * pushed hard by the cursor (big, bold mouse interaction). Pure rAF canvas.
 */

// motion params (motionIntensity = 60, glowPalette = Electric, showNeuralNet = true)
const M = 60
const MGLOW = 0.45 + (M / 100) * 0.7
const MSPEED = 0.45 + (M / 100) * 0.95
const MROT = 0.6 + (M / 100) * 0.9
const MFRAC = M / 100
const PALETTE = ['#2B53FF', '#4F9DFF', '#00E0CC', '#22D3EE', '#7A2BFF']

type Pt = { x: number; y: number; z: number }

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

/* ── arc-length shape sampling ───────────────────────────────── */
function sampleAlong(polys: number[][][], N: number): Pt[] {
  const segs: { poly: number[][]; i: number; l: number }[] = []
  let total = 0
  for (const poly of polys) {
    for (let i = 0; i < poly.length - 1; i++) {
      const dx = poly[i + 1][0] - poly[i][0]
      const dy = poly[i + 1][1] - poly[i][1]
      const l = Math.hypot(dx, dy) || 1e-6
      segs.push({ poly, i, l })
      total += l
    }
  }
  const pts: Pt[] = []
  for (let k = 0; k < N; k++) {
    let d = (k / N) * total
    let idx = 0
    while (idx < segs.length - 1 && d > segs[idx].l) {
      d -= segs[idx].l
      idx++
    }
    const s = segs[idx]
    const f = s.l ? d / s.l : 0
    const a = s.poly[s.i]
    const b = s.poly[s.i + 1]
    pts.push({
      x: a[0] + (b[0] - a[0]) * f,
      y: a[1] + (b[1] - a[1]) * f,
      z: (Math.random() * 2 - 1) * 0.05,
    })
  }
  return pts
}
function shapeBrain(N: number): Pt[] {
  const outline: number[][] = []
  const steps = 54
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const r = 0.6 + 0.07 * Math.sin(6 * t) + 0.05 * Math.sin(3 * t + 0.8) + 0.03 * Math.cos(11 * t)
    outline.push([Math.cos(t) * r * 1.06, Math.sin(t) * r * 0.84 - 0.02])
  }
  const fissure: number[][] = []
  for (let i = 0; i <= 14; i++) {
    const tt = i / 14
    fissure.push([Math.sin(tt * 6.28) * 0.05, -0.5 + tt * 1.0])
  }
  const g1: number[][] = []
  for (let i = 0; i <= 10; i++) {
    const tt = (i / 10) * Math.PI
    g1.push([-0.32 + Math.cos(tt) * 0.17, -0.16 + Math.sin(tt) * 0.15])
  }
  const g2: number[][] = []
  for (let i = 0; i <= 10; i++) {
    const tt = (i / 10) * Math.PI
    g2.push([0.3 + Math.cos(tt) * 0.17, 0.05 - Math.sin(tt) * 0.15])
  }
  return sampleAlong([outline, fissure, g1, g2], N)
}
function shapeKoru(N: number): Pt[] {
  const poly: number[][] = []
  const turns = 3.05
  const steps = 200
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2
    const r = 0.045 * Math.exp(0.3 * t)
    if (r > 0.9) break
    poly.push([Math.cos(t) * r, Math.sin(t) * r])
  }
  return sampleAlong([poly], N)
}
function shapeNZ(N: number): Pt[] {
  // Coordinates are north-up (negative y = north), tilted on NZ's real
  // NNE→SSW long axis. Traced clockwise around each island's coastline with
  // its recognisable features so the particle field reads clearly as Aotearoa.
  const north = [
    [0.16, -0.97], // Cape Reinga
    [0.22, -0.89],
    [0.29, -0.8], // Northland (Bay of Islands)
    [0.37, -0.73], // Auckland
    [0.47, -0.69], // Coromandel / Bay of Plenty (gentle bulge)
    [0.57, -0.64], // Whakatāne
    [0.66, -0.58], // East Cape (rounded far-east point)
    [0.62, -0.51], // Gisborne
    [0.56, -0.46], // Hawke Bay (shallow)
    [0.54, -0.4], // Cape Kidnappers
    [0.49, -0.33], // Wairarapa
    [0.42, -0.27], // Cape Palliser
    [0.37, -0.26], // Wellington (south tip)
    [0.33, -0.33], // Kāpiti coast
    [0.28, -0.41], // Whanganui
    [0.22, -0.47], // south Taranaki
    [0.16, -0.51], // Taranaki (Cape Egmont — west bump)
    [0.19, -0.58], // north Taranaki
    [0.21, -0.66], // Kāwhia (straight-ish Tasman coast)
    [0.2, -0.75], // west coast
    [0.18, -0.85], // Ninety Mile Beach (west Northland)
    [0.16, -0.92],
    [0.16, -0.97],
  ]
  const south = [
    [0.2, -0.13], // Cape Campbell / Marlborough (NE)
    [0.12, -0.03],
    [0.04, 0.05], // Kaikōura
    [-0.03, 0.13], // Pegasus Bay / Christchurch
    [0.04, 0.18], // Banks Peninsula (east bump)
    [-0.05, 0.23], // Canterbury Bight
    [-0.11, 0.31], // Timaru
    [-0.18, 0.41], // Ōamaru
    [-0.24, 0.48], // Otago Peninsula (east bump)
    [-0.32, 0.55], // the Catlins
    [-0.42, 0.61], // Bluff (south tip)
    [-0.52, 0.58], // Southland coast
    [-0.6, 0.52], // Fiordland south
    [-0.65, 0.45], // Fiordland SW (jagged)
    [-0.59, 0.4],
    [-0.66, 0.34], // Fiordland
    [-0.57, 0.26],
    [-0.5, 0.18], // West Coast
    [-0.42, 0.08], // glaciers
    [-0.34, -0.02],
    [-0.26, -0.1], // Westport
    [-0.16, -0.16], // Golden Bay
    [-0.06, -0.2], // Farewell Spit (hooks east)
    [0.02, -0.15], // Nelson / Tasman Bay
    [0.1, -0.16], // Marlborough Sounds
    [0.16, -0.13],
    [0.2, -0.13],
  ]
  return sampleAlong([north, south], N)
}
function shapeAI(N: number): Pt[] {
  const aLeft = [
    [-0.62, 0.5],
    [-0.4, -0.55],
  ]
  const aRight = [
    [-0.4, -0.55],
    [-0.18, 0.5],
  ]
  const aBar = [
    [-0.52, 0.08],
    [-0.28, 0.08],
  ]
  const iStem = [
    [0.36, -0.5],
    [0.36, 0.5],
  ]
  const iTop = [
    [0.2, -0.5],
    [0.52, -0.5],
  ]
  const iBot = [
    [0.2, 0.5],
    [0.52, 0.5],
  ]
  return sampleAlong([aLeft, aRight, aBar, iStem, iTop, iBot], N)
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const c = cv.getContext('2d')
    if (!c) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const N = Math.round(96 + M * 1.05)
    const parts = Array.from({ length: N }, () => {
      const x = Math.random() * 2 - 1
      const y = Math.random() * 2 - 1
      const z = Math.random() * 2 - 1
      return { x, y, z, hx: x, hy: y, hz: z }
    })
    const shapes: Record<string, Pt[]> = {
      brain: shapeBrain(N),
      nz: shapeNZ(N),
      koru: shapeKoru(N),
      ai: shapeAI(N),
    }
    const glows = PALETTE.map(() => ({
      col: '',
      bx: 0.2 + 0.6 * Math.random(),
      by: 0.2 + 0.6 * Math.random(),
      amp: 0.11 + 0.1 * Math.random(),
      phase: Math.random() * 6.28,
      spd: 0.001 + 0.0009 * Math.random(),
      par: 0.05 + 0.07 * Math.random(),
      r: 0.4 + 0.18 * Math.random(),
    }))
    glows.forEach((g, i) => (g.col = PALETTE[i]))

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    let moved = false
    let lock = 0
    const t0 = performance.now()
    let raf = 0

    // scroll velocity → energises the field (brighter links + motion streaks)
    let prevScroll = window.scrollY
    let scrollVel = 0
    let scrollDir = 0

    let scenes: { el: Element; shape: string }[] = []
    const captureScenes = () => {
      scenes = Array.from(document.querySelectorAll('[data-shape]')).map((el) => ({
        el,
        shape: el.getAttribute('data-shape') || '',
      }))
    }
    let lastCapture = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.floor(window.innerWidth * dpr)
      cv.height = Math.floor(window.innerHeight * dpr)
    }

    const frame = (t: number) => {
      const w = cv.width
      const h = cv.height
      const time = t - t0
      c.clearRect(0, 0, w, h)

      // per-frame scroll velocity: jumps up on fast scroll, decays gently
      const sYnow = window.scrollY
      const dScroll = sYnow - prevScroll
      prevScroll = sYnow
      if (Math.abs(dScroll) > 0.01) scrollDir = Math.sign(dScroll)
      scrollVel = Math.max(Math.min(1, Math.abs(dScroll) / 55), scrollVel * 0.9)

      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      const mx = mouse.x - 0.5
      const my = mouse.y - 0.5

      // additive vivid glows
      c.globalCompositeOperation = 'lighter'
      for (const g of glows) {
        g.phase += g.spd * MSPEED * 1.3
        const cx = (g.bx + Math.cos(g.phase) * g.amp + mx * g.par) * w
        const cy = (g.by + Math.sin(g.phase * 0.9) * g.amp + my * g.par) * h
        const rad = g.r * Math.min(w, h)
        const grd = c.createRadialGradient(cx, cy, 0, cx, cy, rad)
        grd.addColorStop(0, hexA(g.col, 0.4 * MGLOW))
        grd.addColorStop(0.4, hexA(g.col, 0.14 * MGLOW))
        grd.addColorStop(1, hexA(g.col, 0))
        c.fillStyle = grd
        c.beginPath()
        c.arc(cx, cy, rad, 0, 6.2832)
        c.fill()
      }
      c.globalCompositeOperation = 'source-over'

      // scroll-linked morph: blend every in-view [data-shape] section weighted
      // by how centered it is, so the field continuously interpolates
      // brain → nz → koru → ai as you scroll rather than snapping per section.
      if (t - lastCapture > 500) {
        captureScenes()
        lastCapture = t
      }
      const vh = window.innerHeight
      const vhc = vh * 0.5
      const active: { shape: Pt[]; w: number }[] = []
      let wsum = 0
      for (const s of scenes) {
        const sh = shapes[s.shape]
        if (!sh) continue
        const r = s.el.getBoundingClientRect()
        if (r.bottom <= 0 || r.top >= vh) continue
        const cen = (Math.max(r.top, 0) + Math.min(r.bottom, vh)) / 2
        const w = Math.max(0, 1 - Math.abs(cen - vhc) / vh)
        if (w <= 0) continue
        active.push({ shape: sh, w })
        wsum += w
      }
      lock += (Math.min(1, wsum) - lock) * 0.06
      const ease = 0.06
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        let bx = 0
        let by = 0
        let bz = 0
        if (wsum > 0) {
          for (const a of active) {
            const wn = a.w / wsum
            const T = a.shape[i]
            bx += T.x * wn
            by += T.y * wn
            bz += T.z * wn
          }
        }
        // interpolate free-field home ↔ blended shape by lock strength
        const dx = p.hx + (bx - p.hx) * lock
        const dy = p.hy + (by - p.hy) * lock
        const dz = p.hz + (bz - p.hz) * lock
        p.x += (dx - p.x) * ease
        p.y += (dy - p.y) * ease
        p.z += (dz - p.z) * ease
      }

      // 3D field (rotation damped while a shape is locked)
      const rd = 1 - 0.82 * lock
      // a touch more idle life: faster autonomous spin + a slow vertical sway
      const ry = (time * 0.00009 * MROT + mx * 0.7 + scrollDir * scrollVel * 0.12) * rd
      const rx = (my * 0.45 + Math.sin(time * 0.00022) * 0.06) * rd
      const cosY = Math.cos(ry)
      const sinY = Math.sin(ry)
      const cosX = Math.cos(rx)
      const sinX = Math.sin(rx)
      const fov = 2.6
      const scale = Math.min(w, h) * 0.4
      const ox = w / 2
      const oy = h * 0.46
      const pr: { sx: number; sy: number; pz: number }[] = []
      for (const p of parts) {
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY
        const y1 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX
        const pz = fov / (fov + z2)
        pr.push({ sx: ox + x1 * scale * pz, sy: oy + y1 * scale * pz, pz })
      }

      // big bold mouse push (quadratic falloff)
      if (moved) {
        const mpx = mouse.x * w
        const mpy = mouse.y * h
        const R = (185 + 130 * MFRAC) * dpr
        const push = (95 + 80 * MFRAC) * dpr
        const R2 = R * R
        for (const q of pr) {
          const ddx = q.sx - mpx
          const ddy = q.sy - mpy
          const d2 = ddx * ddx + ddy * ddy
          if (d2 < R2 && d2 > 1) {
            const dd = Math.sqrt(d2)
            const f = 1 - dd / R
            const amt = f * f * push
            q.sx += (ddx / dd) * amt
            q.sy += (ddy / dd) * amt
          }
        }
      }

      // connections (reach + brightness scale up with scroll velocity)
      const thr = (118 + 46 * scrollVel) * dpr
      const lineBoost = 0.13 + 0.26 * scrollVel
      c.lineWidth = 1 * dpr
      for (let i = 0; i < pr.length; i++) {
        for (let j = i + 1; j < pr.length; j++) {
          const dx = pr[i].sx - pr[j].sx
          const dy = pr[i].sy - pr[j].sy
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < thr) {
            const a = (1 - d / thr) * lineBoost * Math.min(pr[i].pz, pr[j].pz)
            c.strokeStyle = `rgba(170,195,255,${a.toFixed(3)})`
            c.beginPath()
            c.moveTo(pr[i].sx, pr[i].sy)
            c.lineTo(pr[j].sx, pr[j].sy)
            c.stroke()
          }
        }
      }
      // dots (+ motion streaks when scrolling fast)
      const streakLen = scrollVel > 0.06 ? scrollVel * 22 * dpr : 0
      for (const q of pr) {
        if (streakLen) {
          c.strokeStyle = `rgba(150,180,255,${(0.35 * scrollVel * q.pz).toFixed(3)})`
          c.lineWidth = Math.max(0.6, (q.pz - 0.4) * 2.2) * dpr
          c.beginPath()
          c.moveTo(q.sx, q.sy)
          c.lineTo(q.sx, q.sy - scrollDir * streakLen)
          c.stroke()
        }
        const s = Math.max(0.6, (q.pz - 0.4) * 3.2) * dpr
        const b = Math.min(1, (0.5 + 0.4 * scrollVel) * q.pz)
        c.fillStyle = `rgba(232,240,255,${b.toFixed(3)})`
        c.beginPath()
        c.arc(q.sx, q.sy, s, 0, 6.2832)
        c.fill()
      }

      if (!reduced) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth
      mouse.ty = e.clientY / window.innerHeight
      moved = true
    }
    const onVis = () => {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      } else if (!raf && !reduced) {
        raf = requestAnimationFrame(frame)
      }
    }

    resize()
    captureScenes()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)

    if (reduced) frame(performance.now())
    else raf = requestAnimationFrame(frame)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
