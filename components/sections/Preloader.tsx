"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Preloader — brief, elegant opening moment.
 * MENTIS lettermarks fade in then the whole screen dissolves to reveal page.
 * Unmounts itself after the sequence completes.
 */
export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) return;

    // Prevent scroll during preloader
    document.documentElement.style.overflow = "hidden";

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          document.documentElement.style.overflow = "";
          onComplete?.();
        },
      });

      // Letters fade in from slight offset
      tl.fromTo(
        text.querySelectorAll(".preloader-char"),
        { opacity: 0, y: 12, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
        }
      )
        .to(
          text.querySelector(".preloader-sub"),
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .to(overlay, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.6,
        });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Instant reveal — just hold briefly then hide
      setTimeout(() => {
        setVisible(false);
        document.documentElement.style.overflow = "";
        onComplete?.();
      }, 600);
    });

    return () => {
      mm.revert();
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  if (!visible) return null;

  const letters = ["C", "A", "R", "E"];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--mentis-deep)]"
      role="status"
      aria-label="Loading Private Practice"
    >
      <div ref={textRef} className="text-center">
        {/* MENTIS letters */}
        <div className="flex items-center justify-center gap-1 md:gap-2 mb-3">
          {letters.map((char, i) => (
            <span
              key={i}
              className="preloader-char inline-block font-display text-5xl md:text-7xl font-light tracking-[0.3em] text-[var(--mentis-light)]"
              style={{ fontFamily: "var(--font-display)", opacity: 0 }}
            >
              {char}
            </span>
          ))}
        </div>
        {/* Tagline */}
        <p
          className="preloader-sub text-xs tracking-[0.4em] uppercase text-[var(--mentis-sage)] opacity-0"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Private Practice
        </p>
      </div>

      {/* Subtle leaf shape */}
      <svg
        className="absolute opacity-5 w-64 h-64 md:w-96 md:h-96"
        viewBox="0 0 200 300"
        aria-hidden="true"
      >
        <path
          d="M100,20 C145,70 175,150 155,230 C140,285 60,285 45,230 C25,150 55,70 100,20 Z"
          fill="var(--mentis-sage)"
        />
      </svg>
    </div>
  );
}

export default Preloader;
