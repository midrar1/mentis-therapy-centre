"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface FloatingLeafProps {
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

/**
 * FloatingLeaf — ambient idle animation (no ScrollTrigger).
 * Uses GSAP yoyo repeat for a gentle, breathing float.
 * Respects prefers-reduced-motion via gsap.matchMedia.
 */
export const FloatingLeaf: React.FC<FloatingLeafProps> = ({
  className = "",
  delay = 0,
  size = "md",
}) => {
  const leafRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "w-8 h-12",
    md: "w-12 h-18",
    lg: "w-16 h-24",
  };

  useEffect(() => {
    const leaf = leafRef.current;
    const container = containerRef.current;
    if (!leaf || !container) return;

    const mm = gsap.matchMedia(container);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Gentle float — slow breathing y movement + subtle rotation
      gsap.set(leaf, { rotation: -8, y: 0, transformOrigin: "50% 30%" });

      const tl = gsap.timeline({ repeat: -1, yoyo: true, delay });

      tl.to(leaf, {
        y: -18,
        rotation: 12,
        x: 6,
        duration: 3.5,
        ease: "sine.inOut",
      }).to(leaf, {
        y: -8,
        rotation: -5,
        x: -4,
        duration: 3,
        ease: "sine.inOut",
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Static, gentle tilt
      gsap.set(leaf, { rotation: -8, opacity: 0.8 });
    });

    return () => mm.revert();
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute ${className}`}
    >
      <svg
        ref={leafRef}
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="float-leaf-grad"
            x1="20%"
            y1="0%"
            x2="80%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#5aad9e" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#2d7d6e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1a4d44" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Asymmetric organic leaf shape — slightly different from FallingLeaf */}
        <path
          d="M50,8 C72,30 92,68 78,112 C68,140 34,142 24,112 C10,76 28,32 50,8 Z"
          fill="url(#float-leaf-grad)"
          stroke="#4d9b8d"
          strokeWidth="1"
        />

        {/* Central vein */}
        <path
          d="M50,8 Q47,78 50,145"
          stroke="#7cb3ac"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />

        {/* Side veins */}
        <path d="M50,40 Q60,34 68,37" stroke="#7cb3ac" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M50,62 Q63,55 70,60" stroke="#7cb3ac" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M50,84 Q62,78 68,84" stroke="#7cb3ac" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M50,40 Q40,34 32,37" stroke="#7cb3ac" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M50,62 Q37,55 30,60" stroke="#7cb3ac" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M50,84 Q38,78 32,84" stroke="#7cb3ac" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default FloatingLeaf;
