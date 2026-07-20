"use client";

import { useEffect } from "react";

/**
 * Playful 3D tilt for the About portrait: the photo leans toward the pointer
 * while the cursor is over it, easing back to rest on leave. Skipped on touch
 * and reduced-motion. Mount once per page; drives the --rx / --ry CSS vars that
 * .h-portrait-photo reads.
 */
export default function AboutPlay() {
  useEffect(() => {
    const portrait = document.querySelector<HTMLElement>(".h-portrait");
    if (!portrait) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;

    const MAX = 11; // degrees of lean at the edge
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const onMove = (event: PointerEvent) => {
      const rect = portrait.getBoundingClientRect();
      const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetX = clamp(nx) * MAX; // rotateY — follows horizontal position
      targetY = clamp(ny) * -MAX; // rotateX — follows vertical position
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      portrait.style.setProperty("--rx", `${x.toFixed(2)}deg`);
      portrait.style.setProperty("--ry", `${y.toFixed(2)}deg`);
      frame = requestAnimationFrame(tick);
    };

    portrait.addEventListener("pointermove", onMove);
    portrait.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      portrait.removeEventListener("pointermove", onMove);
      portrait.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
