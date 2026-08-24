"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * About — Who Mentis is.
 * Large display text + placeholder copy with parallax organic shape.
 * Warm ivory/stone tones.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const shape = shapeRef.current;
    if (!section || !text || !shape) return;

    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        text.querySelectorAll(".about-reveal"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: text, start: "top 78%" },
        }
      );

      // Slow parallax on the organic shape
      gsap.to(shape, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(text?.querySelectorAll(".about-reveal"), { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[var(--mentis-forest)] mentis-section relative overflow-hidden"
    >
      {/* Background organic shape */}
      <div
        ref={shapeRef}
        className="absolute -top-24 -right-24 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <svg width="500" height="600" viewBox="0 0 500 600" fill="none">
          <path
            d="M250,30 C380,80 470,200 440,380 C415,520 240,580 160,480 C60,360 60,200 130,100 C175,40 230,20 250,30 Z"
            fill="var(--mentis-sage)"
          />
        </svg>
      </div>

      <div className="mentis-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text */}
          <div ref={textRef}>
            <p
              className="about-reveal text-xs tracking-[0.4em] uppercase text-[var(--mentis-sage)] mb-6 opacity-0"
              style={{ fontFamily: "var(--font-body)" }}
            >
              About Our Practice
            </p>
            <h2
              className="about-reveal font-display text-4xl md:text-5xl lg:text-6xl font-light text-[var(--mentis-light)] mb-8 leading-tight opacity-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A practice built<br />
              <em>on compassion.</em>
            </h2>
            <div className="space-y-5">
              {[
                "Our private practice was founded with one belief: every patient deserves thoughtful, expert care.",
                "Our doctors bring clinical expertise, clear communication, and genuine care to every visit.",
                "Whether you are navigating a difficult season or seeking deeper self-understanding, we are here — ready to walk alongside you.",
              ].map((para, i) => (
                <p
                  key={i}
                  className={`about-reveal text-base leading-relaxed text-[var(--mentis-faint)] opacity-0`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Right — Decorative organic visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              {/* Organic frame */}
              <svg
                viewBox="0 0 400 400"
                fill="none"
                className="w-full h-full"
                aria-label="Abstract representation of growth and nature"
                role="img"
              >
                {/* Outer organic shape */}
                <path
                  d="M200,30 C285,45 360,110 365,200 C370,290 310,365 220,378 C130,391 50,335 38,245 C25,155 80,65 160,38 C175,32 190,28 200,30 Z"
                  fill="var(--mentis-teal)"
                  fillOpacity="0.15"
                  stroke="var(--mentis-sage)"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />

                {/* Inner tree form */}
                <path
                  d="M200,350 C198,290 194,255 196,220 C198,185 200,160 200,130"
                  stroke="var(--mentis-sage)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
                <path
                  d="M198,240 C178,225 152,216 128,208"
                  stroke="var(--mentis-sage)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
                <path
                  d="M199,225 C220,210 248,202 274,194"
                  stroke="var(--mentis-sage)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
                <path
                  d="M199,185 C183,168 164,158 143,150"
                  stroke="var(--mentis-sage-lt)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
                <path
                  d="M200,175 C216,158 238,148 260,140"
                  stroke="var(--mentis-sage-lt)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
                <path
                  d="M200,130 C190,108 185,90 186,72"
                  stroke="var(--mentis-sage-lt)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />

                {/* Leaf clusters at branch tips */}
                {[
                  { cx: 128, cy: 206, rx: 14, ry: 9, rot: -30 },
                  { cx: 274, cy: 192, rx: 14, ry: 9, rot: 20 },
                  { cx: 143, cy: 148, rx: 11, ry: 7, rot: -25 },
                  { cx: 260, cy: 138, rx: 11, ry: 7, rot: 30 },
                  { cx: 186, cy: 70, rx: 10, ry: 7, rot: -10 },
                ].map((l, i) => (
                  <ellipse
                    key={i}
                    cx={l.cx}
                    cy={l.cy}
                    rx={l.rx}
                    ry={l.ry}
                    fill="var(--mentis-sage)"
                    fillOpacity="0.5"
                    transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
                  />
                ))}

                {/* Center word */}
                <text
                  x="200"
                  y="205"
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize="16"
                  fill="var(--mentis-sage-lt)"
                  opacity="0.6"
                  fontStyle="italic"
                >
                  Growing together
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
