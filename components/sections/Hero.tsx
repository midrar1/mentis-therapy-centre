"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingLeaf } from "@/components/animations/FloatingLeaf";
import { FallingLeaf } from "@/components/animations/FallingLeaf";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero — Primary visual impact.
 * Left: Editorial typography with staggered reveal.
 * Right: Animated organic tree SVG with stroke-dashoffset branch drawing.
 * FloatingLeaf + FallingLeaf instances as ambient organic decoration.
 * Parallax scroll for the tree visual.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<SVGSVGElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [clinicSignal, setClinicSignal] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setClinicSignal((current) => (current + 1) % 3), 2600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const tree = treeRef.current;
    const tagline = taglineRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !headline || !tree) return;

    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // --- Entrance timeline (auto, on load) ---
      const entranceTl = gsap.timeline({ delay: 0.1 });

      // Headline words appear
      entranceTl
        .fromTo(
          headline.querySelectorAll(".hero-word"),
          { opacity: 0, y: 40, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            stagger: 0.12,
            duration: 1.1,
            ease: "power3.out",
          }
        )
        .fromTo(
          tagline,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        );

      // Tree branches draw in
      const branches = tree.querySelectorAll<SVGPathElement>(".tree-branch");
      branches.forEach((b) => {
        const len = b.getTotalLength?.() ?? 200;
        gsap.set(b, { strokeDasharray: len, strokeDashoffset: len });
      });

      entranceTl.to(
        branches,
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
          stagger: 0.18,
        },
        "-=0.8"
      );

      // Scroll hint fade in
      if (scrollHint) {
        entranceTl.fromTo(
          scrollHint,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
        // Animate the scroll line
        gsap.to(scrollHint.querySelector(".scroll-line"), {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.8,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 0.8,
          delay: 2,
        });
      }

      // --- Scroll-linked parallax (tree + text depth) ---
      gsap.to(tree, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(headline, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Static reveal — no movement
      gsap.set(headline?.querySelectorAll(".hero-word"), { opacity: 1, y: 0 });
      gsap.set(tagline, { opacity: 1 });
      const branches = tree.querySelectorAll<SVGPathElement>(".tree-branch");
      branches.forEach((b) => {
        const len = b.getTotalLength?.() ?? 200;
        gsap.set(b, { strokeDasharray: len, strokeDashoffset: 0 });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--mentis-deep)] flex items-center overflow-hidden mentis-grain"
    >
      {/* Ambient gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 75% 50%, rgba(45,125,110,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Floating leaf decorations */}
      <FloatingLeaf className="top-[15%] left-[8%] opacity-30" delay={0.3} size="sm" />
      <FloatingLeaf className="top-[60%] left-[12%] opacity-20" delay={1.2} size="md" />

      <div className="mentis-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-28 md:py-36">
        {/* Left — Typography */}
        <div>
          {/* Label */}
          <p
            className="text-xs tracking-[0.4em] uppercase text-[var(--mentis-sage)] mb-8 opacity-80"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Private Practice
          </p>

          {/* Headline */}
          <div ref={headlineRef} aria-label="Care. Trust. Progress.">
            {[
              { word: "Care.", italic: false },
              { word: "Trust.", italic: true },
              { word: "Progress.", italic: false },
            ].map(({ word, italic }) => (
              <div key={word} className="overflow-hidden leading-none mb-2">
                <h1
                  className={`hero-word inline-block font-display text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-light text-[var(--mentis-light)] ${
                    italic ? "italic" : ""
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {word}
                </h1>
              </div>
            ))}
          </div>

          {/* Sub-copy */}
          <div ref={taglineRef} className="mt-10 opacity-0">
            <p
              className="text-base md:text-lg text-[var(--mentis-faint)] max-w-md leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Expert care that feels personal. Clear answers, thoughtful support,
              and a better path forward for every patient.
            </p>
          </div>
        </div>

        {/* Right — Organic Tree SVG */}
        <div className="flex items-center justify-center relative min-h-[360px] lg:min-h-[500px]">
          {/* Falling leaf over tree */}
          <FallingLeaf className="top-0 right-8 opacity-60" />

          <div className="absolute left-0 top-10 z-20 rounded-xl border border-white/10 bg-[var(--mentis-deep)]/80 px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-500" aria-live="polite">
            <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[var(--mentis-sage)]">Practice update</p>
            <p className="mt-1 text-sm text-[var(--mentis-light)]">
              {["Appointments open this week", "Care plans tailored to you", "A welcoming first visit"] [clinicSignal]}
            </p>
          </div>

          <svg
            ref={treeRef}
            viewBox="0 0 340 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-xs md:max-w-sm lg:max-w-full h-auto"
            aria-label="Organic tree — symbol of care and growth"
            role="img"
          >
            <defs>
              <radialGradient id="tree-glow" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="#2d7d6e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2d7d6e" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient glow behind tree */}
            <ellipse cx="170" cy="320" rx="130" ry="140" fill="url(#tree-glow)" />

            {/* Trunk */}
            <path
              className="tree-branch"
              d="M170,480 C168,420 162,380 165,340 C168,300 170,260 170,220"
              stroke="#3d7a6e"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
            />

            {/* Main lower branches */}
            <path
              className="tree-branch"
              d="M165,340 C140,320 100,310 70,295"
              stroke="#3d7a6e"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M167,320 C195,300 230,295 265,278"
              stroke="#3d7a6e"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Mid branches */}
            <path
              className="tree-branch"
              d="M168,280 C148,262 118,248 92,235"
              stroke="#4a8f80"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M169,268 C192,250 218,240 248,226"
              stroke="#4a8f80"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M170,240 C162,210 156,185 158,165"
              stroke="#4a8f80"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Upper fine branches */}
            <path
              className="tree-branch"
              d="M160,200 C138,180 112,168 85,158"
              stroke="#5ca898"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M162,185 C180,162 206,148 234,138"
              stroke="#5ca898"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M158,165 C148,140 144,118 145,95"
              stroke="#5ca898"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M70,295 C52,282 38,268 28,250"
              stroke="#5ca898"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M265,278 C282,262 295,246 308,230"
              stroke="#5ca898"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Finest tip branches */}
            <path
              className="tree-branch"
              d="M145,95 C132,72 128,52 130,35"
              stroke="#6dbdac"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M145,95 C158,75 172,58 180,42"
              stroke="#6dbdac"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M85,158 C65,145 48,135 32,128"
              stroke="#6dbdac"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M234,138 C252,125 270,115 288,108"
              stroke="#6dbdac"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M28,250 C16,235 10,218 12,200"
              stroke="#6dbdac"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="tree-branch"
              d="M308,230 C318,215 324,198 322,182"
              stroke="#6dbdac"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Leaf clusters — organic ovals at branch tips */}
            {[
              { cx: 130, cy: 32, rx: 22, ry: 14 },
              { cx: 180, cy: 38, rx: 18, ry: 12 },
              { cx: 85, cy: 152, rx: 16, ry: 11 },
              { cx: 32, cy: 124, rx: 14, ry: 9 },
              { cx: 288, cy: 104, rx: 14, ry: 9 },
              { cx: 12, cy: 197, rx: 13, ry: 8 },
              { cx: 322, cy: 178, rx: 13, ry: 8 },
              { cx: 70, cy: 292, rx: 14, ry: 9 },
              { cx: 265, cy: 275, rx: 14, ry: 9 },
            ].map((leaf, i) => (
              <ellipse
                key={i}
                cx={leaf.cx}
                cy={leaf.cy}
                rx={leaf.rx}
                ry={leaf.ry}
                fill="#2d7d6e"
                fillOpacity="0.55"
                transform={`rotate(${(i * 37) % 60 - 30} ${leaf.cx} ${leaf.cy})`}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--mentis-faint)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-[var(--mentis-sage)] opacity-40 overflow-hidden">
          <div className="scroll-line w-full h-full bg-[var(--mentis-sage)]" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
