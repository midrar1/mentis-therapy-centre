"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Intro — Editorial philosophy section.
 * Large quote-style typography with a ScrollTrigger clip-path / opacity reveal.
 * Light, quiet, giving space after the intense hero.
 */
export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const lines = linesRef.current;
    if (!section || !quote || !lines) return;

    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Quote reveal — each line arrives independently for editorial rhythm.
      gsap.fromTo(
        quote.querySelectorAll(".promise-line"),
        { opacity: 0, y: 48, filter: "blur(10px)", clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0% 0)",
          stagger: 0.2,
          duration: 1.15,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: quote,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll(".promise-leaf-path"),
        { strokeDasharray: 180, strokeDashoffset: 180 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          stagger: 0.12,
          ease: "power2.inOut",
          scrollTrigger: { trigger: quote, start: "bottom 82%" },
        }
      );

      // Support lines stagger
      gsap.fromTo(
        lines.querySelectorAll(".intro-line"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: lines,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [quote?.querySelectorAll(".promise-line"), lines?.querySelectorAll(".intro-line")],
        { opacity: 1, y: 0, filter: "none", clipPath: "inset(0 0 0% 0)" }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="promise-section relative overflow-hidden bg-[var(--mentis-ivory)] mentis-section"
    >
      <span className="promise-orb promise-orb-one" aria-hidden="true" />
      <span className="promise-orb promise-orb-two" aria-hidden="true" />

      <div className="mentis-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <p
            className="text-xs tracking-[0.4em] uppercase text-[var(--mentis-teal)] mb-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our Promise
          </p>

          {/* Main quote */}
          <div ref={quoteRef}>
            <blockquote
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light italic leading-tight text-[var(--mentis-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="promise-line block">&ldquo;Care that listens.</span>
              <span className="promise-line block">Support that moves forward.&rdquo;</span>
            </blockquote>
          </div>

          {/* Divider leaf */}
          <div className="promise-leaf flex justify-center my-10" aria-hidden="true">
            <svg width="40" height="56" viewBox="0 0 40 56" fill="none">
              <path className="promise-leaf-path"
                d="M20,4 C30,16 36,32 30,46 C25,57 15,57 10,46 C4,32 10,16 20,4 Z"
                fill="none"
                stroke="var(--mentis-sage)"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
              <line className="promise-leaf-path" x1="20" y1="4" x2="20" y2="55" stroke="var(--mentis-sage)" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
          </div>

          {/* Support copy */}
          <div ref={linesRef}>
            {[
              "Every appointment starts with listening carefully and understanding what matters to you.",
              "Clear guidance, clinical expertise, and respect shape every decision we make together.",
              "Care continues beyond the visit, with support designed around your needs.",
            ].map((line, i) => (
              <p
                key={i}
                className="intro-line text-base md:text-lg text-[var(--mentis-muted)] leading-relaxed mb-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
