"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    number: "1",
    title: "Choose Your Care",
    description:
      "Explore our services and choose the kind of care or specialist support you need.",
  },
  {
    number: "2",
    title: "Book a Visit",
    description:
      "Request an appointment online, by phone, or through your preferred clinic contact method.",
  },
  {
    number: "3",
    title: "Meet Your Doctor",
    description:
      "Your doctor creates a clear care plan tailored to your health needs, preferences, and next steps.",
  },
  {
    number: "4",
    title: "Follow Your Plan",
    description:
      "Continue with follow-up care and a plan built around your health, goals, and lifestyle.",
  },
];

/**
 * HowItWorks — Simple numbered process section.
 * Alternating or horizontal step layout with stagger reveal.
 */
export function HowItWorks() {
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
        steps.querySelectorAll(".how-step"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: steps, start: "top 78%" },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([heading, steps?.querySelectorAll(".how-step")], { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--mentis-stone)] mentis-section"
    >
      <div className="mentis-container">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <p
            className="text-xs tracking-[0.4em] uppercase text-[var(--mentis-teal)] mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Process
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-light text-[var(--mentis-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {STEPS.map((step, i) => (
            <div key={step.number} className="how-step opacity-0 relative">
              {/* Connector line (desktop only, not last) */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-full w-full h-px bg-[var(--mentis-sand)] -translate-y-1/2 z-0 pr-6"
                  aria-hidden="true"
                />
              )}

              {/* Number circle */}
              <div className="relative z-10 w-12 h-12 rounded-full border border-[var(--mentis-sage)] flex items-center justify-center mb-6">
                <span
                  className="font-display text-lg font-light text-[var(--mentis-teal)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="font-display text-xl md:text-2xl font-light text-[var(--mentis-text)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-[var(--mentis-muted)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
