"use client";

import { useEffect, useRef } from "react";

const GLYPHS = ["{ }", "</>", "01", "=>", "[ ]", "fx()", "git", "npm i", "AI", "...", "const", "01101", "#", "*", "&&", "( )"];
const COLOR_MAP = { ash: "154,160,166", lime: "198,242,78", violet: "124,92,255" };

export function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = { width: 0, height: 0 };
    let particles = [];
    let raf = 0;

    function spawn() {
      const hue = Math.random() < 0.22 ? "lime" : Math.random() < 0.14 ? "violet" : "ash";
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        g: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        vy: 0.12 + Math.random() * 0.2,
        size: 12 + Math.random() * 6,
        life: 0,
        dur: 260 + Math.random() * 280,
        hue,
      };
    }

    function resize() {
      const parent = canvas.parentElement;
      rect.width = parent ? parent.getBoundingClientRect().width : window.innerWidth;
      rect.height = parent ? parent.getBoundingClientRect().height : window.innerHeight;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(30, Math.min(78, Math.floor((rect.width * rect.height) / 17000)));
      particles = new Array(count).fill(0).map(spawn);
    }

    function alphaFor(t, hue) {
      const peak = hue === "ash" ? 0.3 : 0.42;
      if (t < 0.15) return (t / 0.15) * peak;
      if (t > 0.85) return ((1 - t) / 0.15) * peak;
      return peak;
    }

    function paint() {
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((p) => {
        const t = p.life / p.dur;
        const a = alphaFor(t, p.hue);
        ctx.font = `600 ${p.size}px var(--font-mono)`;
        if (p.hue !== "ash") {
          ctx.shadowColor = `rgba(${COLOR_MAP[p.hue]},${(a * 0.9).toFixed(3)})`;
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(${COLOR_MAP[p.hue]},${a.toFixed(3)})`;
        ctx.fillText(p.g, p.x, p.y);
      });
      ctx.shadowBlur = 0;
    }

    function step() {
      particles.forEach((p, i) => {
        p.y -= p.vy;
        p.life += 1;
        if (p.life > p.dur || p.y < -20) particles[i] = spawn();
      });
      paint();
      raf = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      paint();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
