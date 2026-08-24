"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register GSAP ScrollTrigger plugin on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FallingLeafProps {
  className?: string;
}

export const FallingLeaf: React.FC<FallingLeafProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const leaf = leafRef.current;
    if (!container || !leaf) return;

    /**
     * GSAP matchMedia context setup:
     * - Animates organic falling trajectory via ScrollTrigger when prefers-reduced-motion is no-preference.
     * - Fallback to calm static state when reduced motion is preferred.
     * - Context automatically handles complete cleanup on component unmount via mm.revert().
     */
    const mm = gsap.matchMedia(container);

    mm.add(
      {
        isNormal: "(prefers-reduced-motion: no-preference)",
        isReduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isNormal } = context.conditions as {
          isNormal: boolean;
          isReduced: boolean;
        };

        if (isNormal) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          // Organic falling motion sequence: downward displacement, horizontal swaying, gradual rotation, scale pulsing, and end fade.
          tl.to(leaf, {
            y: "35vh",
            x: "8vw",
            rotation: 35,
            scale: 0.95,
            ease: "sine.inOut",
            duration: 1,
          })
            .to(leaf, {
              y: "70vh",
              x: "-6vw",
              rotation: -25,
              scale: 1.05,
              ease: "sine.inOut",
              duration: 1,
            })
            .to(leaf, {
              y: "105vh",
              x: "10vw",
              rotation: 55,
              scale: 0.9,
              ease: "sine.inOut",
              duration: 1,
            })
            .to(leaf, {
              y: "140vh",
              x: "-3vw",
              rotation: 15,
              scale: 0.85,
              opacity: 0.15,
              ease: "sine.inOut",
              duration: 1,
            });
        } else {
          // Reduced motion: static, subtle visible position without scroll animation
          gsap.set(leaf, {
            y: 0,
            x: 0,
            rotation: 0,
            opacity: 0.85,
            scale: 1,
          });
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute ${className ?? ""}`}
    >
      <svg
        ref={leafRef}
        viewBox="0 0 120 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-24 md:w-24 md:h-36 drop-shadow-sm"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="mentis-leaf-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#418d84" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#2e6f66" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a4d46" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient
            id="mentis-stem-grad"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7cb3ac" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#31635c" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Outer leaf silhouette */}
        <path
          d="M60,10 C85,45 105,85 90,130 C78,165 42,165 30,130 C15,85 35,45 60,10 Z"
          fill="url(#mentis-leaf-grad)"
          stroke="#529c93"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Central stem */}
        <path
          d="M60,10 Q58,90 60,170"
          stroke="url(#mentis-stem-grad)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Right internal veins */}
        <path
          d="M59,50 Q72,42 80,45"
          stroke="#7cb3ac"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M59,75 Q77,65 86,72"
          stroke="#7cb3ac"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M59,100 Q76,92 84,102"
          stroke="#7cb3ac"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M60,125 Q72,120 78,130"
          stroke="#7cb3ac"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />

        {/* Left internal veins */}
        <path
          d="M61,50 Q48,42 40,45"
          stroke="#7cb3ac"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M61,75 Q43,65 34,72"
          stroke="#7cb3ac"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M61,100 Q44,92 36,102"
          stroke="#7cb3ac"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M60,125 Q48,120 42,130"
          stroke="#7cb3ac"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default FallingLeaf;
