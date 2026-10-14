import { useEffect, useMemo, useRef } from "react";

// A 3×3×3 cube of grey cubelets that lives in the hero, then shrinks into the
// page margin as you scroll and hops to the opposite margin at each new
// section. One fixed element, driven by a single requestAnimationFrame loop
// that writes transforms directly (no React re-renders, no layout reads per
// frame), so it stays smooth.

const SIZE = 210; // cube edge in px at scale 1
const N = 3;
const CELL = SIZE / N;
const FACE = CELL - 5; // small gap between cubelets
const HALF = FACE / 2;
const SECTIONS = ["home", "about", "portfolio", "pipeline", "skills", "contact"];
const CONTENT_MAX = 1200;

const FACE_TRANSFORMS = {
  front: `translateZ(${HALF}px)`,
  back: `rotateY(180deg) translateZ(${HALF}px)`,
  right: `rotateY(90deg) translateZ(${HALF}px)`,
  left: `rotateY(-90deg) translateZ(${HALF}px)`,
  top: `rotateX(90deg) translateZ(${HALF}px)`,
  bottom: `rotateX(-90deg) translateZ(${HALF}px)`,
};
// Fixed "lighting": top is lit, bottom in shadow, sides in between.
const FACE_LIGHT = { top: 1.45, front: 1.1, right: 0.85, left: 0.95, back: 0.8, bottom: 0.55 };
const TONES = [30, 34, 38, 42, 46]; // grey levels (0–255) for the mosaic

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const grey = (v) => `rgb(${v},${v + 2},${v + 5})`;

const useCubelets = () =>
  useMemo(() => {
    const list = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (!x && !y && !z) continue;
          const tone = TONES[Math.floor(rand() * TONES.length)];
          list.push({ key: `${x}${y}${z}`, x, y, z, tone });
        }
    return list;
  }, []);

const ScrollCube = () => {
  const wrap = useRef(null);
  const rotor = useRef(null);
  const cubeletEls = useRef([]);
  const cubelets = useCubelets();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anchor = document.querySelector("[data-cube-anchor]");
    if (!anchor || !wrap.current) return undefined;

    // Cached layout — refreshed on resize / content size changes only.
    let a = { x: 0, y: 0, w: 0 };
    let heroH = 1;
    let sectionTops = [];
    const measure = () => {
      const r = anchor.getBoundingClientRect();
      a = { x: r.left + r.width / 2, y: r.top + window.scrollY + r.height / 2, w: r.width };
      heroH = document.getElementById("home")?.offsetHeight || window.innerHeight;
      sectionTops = SECTIONS.map((id) => document.getElementById(id)?.offsetTop ?? Infinity);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);

    // Spring state
    let x = null, y = 0, s = 1, vx = 0, vy = 0, vs = 0;
    let rotY = -35, spread = 0, lastSpread = -1, last = performance.now();
    let raf;

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const sy = window.scrollY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const heroX = a.x;
      const heroY = a.y - sy;
      const heroS = a.w / (SIZE * 1.6);
      const gutter = Math.max(0, (vw - CONTENT_MAX) / 2);
      const canDock = gutter >= 100 && a.w > 0 && !reduced;
      const t = clamp(sy / (heroH * 0.55), 0, 1);
      const e = easeInOut(t);

      // Active section = the one under the middle of the screen.
      let idx = 0;
      for (let i = 0; i < sectionTops.length; i++) if (sectionTops[i] <= sy + vh * 0.5) idx = i;
      const leftX = gutter / 2;
      const rightX = vw - gutter / 2;
      const dockX = idx % 2 === 1 ? leftX : rightX;
      const dockS = Math.min(0.42, (gutter * 0.7) / (SIZE * 1.6));

      let tx, ty, ts, opacity;
      if (canDock) {
        tx = lerp(heroX, dockX, e);
        ty = lerp(heroY, vh * 0.52, e);
        ts = lerp(heroS, dockS, e);
        opacity = 1;
      } else {
        // Narrow screens: no margin to sit in — shrink and fade with the hero.
        tx = heroX;
        ty = heroY;
        ts = heroS * (1 - 0.35 * t);
        opacity = 1 - clamp(t * 1.6, 0, 1);
      }

      if (x === null || reduced) {
        x = tx; y = ty; s = ts;
      } else {
        // Tight follow while leaving the hero; a softer, slightly bouncy
        // spring for the hop between margins.
        const docked = e >= 1;
        const kx = docked ? 48 : 320, cx = docked ? 11 : 36;
        vx += (kx * (tx - x) - cx * vx) * dt; x += vx * dt;
        vy += (320 * (ty - y) - 36 * vy) * dt; y += vy * dt;
        vs += (260 * (ts - s) - 32 * vs) * dt; s += vs * dt;
      }

      // Arc between the margins + cubelets drift apart mid-flight, snap back on landing.
      let hop = 0;
      let targetSpread = 0;
      if (canDock && e >= 1 && rightX > leftX) {
        const f = clamp((x - leftX) / (rightX - leftX), 0, 1);
        const arc = Math.sin(f * Math.PI);
        hop = -arc * Math.min(150, vh * 0.2);
        targetSpread = arc * 0.45;
      }
      spread += (targetSpread - spread) * Math.min(1, dt * 10);

      if (!reduced) rotY += dt * (16 + Math.min(240, Math.abs(vx) * 0.12));
      const tilt = clamp(vx * 0.01, -12, 12);

      wrap.current.style.transform = `translate3d(${x - SIZE / 2}px, ${y + hop - SIZE / 2}px, 0) scale(${s})`;
      wrap.current.style.opacity = opacity;
      rotor.current.style.transform = `rotateX(-24deg) rotateZ(${tilt}deg) rotateY(${rotY}deg)`;

      if (Math.abs(spread - lastSpread) > 0.002) {
        lastSpread = spread;
        const k = CELL * (1 + spread);
        cubelets.forEach((c, i) => {
          const el = cubeletEls.current[i];
          if (el) el.style.transform = `translate3d(${c.x * k}px, ${c.y * k}px, ${c.z * k}px)`;
        });
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [cubelets]);

  return (
    <div
      ref={wrap}
      className="pointer-events-none fixed left-0 top-0 z-40 will-change-transform"
      style={{ width: SIZE, height: SIZE, perspective: 1100, opacity: 0 }}
      aria-hidden="true"
      data-testid="scroll-cube"
    >
      <div ref={rotor} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {cubelets.map((c, i) => (
          <div
            key={c.key}
            ref={(el) => (cubeletEls.current[i] = el)}
            className="absolute"
            style={{
              left: SIZE / 2 - HALF,
              top: SIZE / 2 - HALF,
              width: FACE,
              height: FACE,
              transformStyle: "preserve-3d",
              transform: `translate3d(${c.x * CELL}px, ${c.y * CELL}px, ${c.z * CELL}px)`,
            }}
          >
            {Object.entries(FACE_TRANSFORMS).map(([face, tf]) => (
              <div
                key={face}
                className="absolute inset-0 rounded-[3px]"
                style={{
                  transform: tf,
                  background: grey(Math.round(c.tone * FACE_LIGHT[face])),
                  border: `1px solid ${grey(Math.round(c.tone * FACE_LIGHT[face] + 22))}`,
                  backfaceVisibility: "hidden",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollCube;
