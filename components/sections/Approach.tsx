"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    number: "01",
    word: "Listen",
    description:
      "We start by understanding your concerns, your history, and what matters most to you.",
  },
  {
    number: "02",
    word: "Assess",
    description:
      "Your doctor brings together clinical insight, clear information, and the right next steps.",
  },
  {
    number: "03",
    word: "Support",
    description:
      "We stay connected through treatment, follow-ups, and care that evolves with your needs.",
  },
];

/**
 * Approach — Editorial narrative section.
 * Three large words with horizontal line connectors.
 * Each step reveals on scroll.
 */
export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const steps = stepsRef.current;
    if (!section || !heading || !steps) return;

    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 82%" },
        }
      );

      gsap.fromTo(
        steps.querySelectorAll(".approach-step"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.22,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: steps, start: "top 76%" },
        }
      );

      // Connector lines draw in
      gsap.fromTo(
        steps.querySelectorAll(".connector-line"),
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          stagger: 0.22,
          duration: 0.7,
          ease: "power2.inOut",
          scrollTrigger: { trigger: steps, start: "top 76%" },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [heading, steps?.querySelectorAll(".approach-step"), steps?.querySelectorAll(".connector-line")],
        { opacity: 1, x: 0, scaleX: 1 }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="bg-[var(--mentis-ivory)] mentis-section"
    >
      <div className="mentis-container">
        {/* Heading */}
        <div ref={headingRef} className="mb-20 opacity-0">
          <p
            className="text-xs tracking-[0.4em] uppercase text-[var(--mentis-teal)] mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            How We Work
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-light text-[var(--mentis-text)] max-w-md"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Care Approach
          </h2>
        </div>

        {/* Steps — vertical on mobile, horizontal on desktop */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
        >
          {STEPS.map((step, i) => (
            <React.Fragment key={step.number}>
              <div className="approach-step opacity-0 flex flex-col">
                {/* Top: number + horizontal line (desktop) */}
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="text-[0.65rem] tracking-[0.35em] text-[var(--mentis-sand)] font-light"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {step.number}
                  </span>
                  <div className="connector-line hidden md:block flex-1 h-px bg-[var(--mentis-sand)]" />
                </div>

                {/* Word */}
                <h3
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-light italic text-[var(--mentis-forest)] mb-6 leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.word}
                </h3>

                {/* Description */}
                <p
                  className="text-sm md:text-base leading-relaxed text-[var(--mentis-muted)] max-w-xs"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {step.description}
                </p>

                {/* Vertical spacer on mobile */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden w-px h-12 bg-[var(--mentis-sand)] ml-2 my-8" />
                )}
              </div>

              {/* Space between columns on desktop */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Approach;
