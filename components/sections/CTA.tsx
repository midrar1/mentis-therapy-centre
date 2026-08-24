"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { FloatingLeaf } from "@/components/animations/FloatingLeaf";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARE_SIGNALS = [
  { title: "Same-week appointments", detail: "Care when you need it", side: "left", position: "lg:left-[4%] lg:top-[18%]" },
  { title: "Personal care plans", detail: "Built around your needs", side: "left", position: "lg:left-[7%] lg:bottom-[13%]" },
  { title: "Qualified doctors", detail: "Trusted clinical expertise", side: "right", position: "lg:right-[5%] lg:top-[17%]" },
  { title: "Easy follow-up", detail: "Support beyond the visit", side: "right", position: "lg:right-[7%] lg:bottom-[12%]" },
] as const;

/**
 * CTA — Emotionally warm call-to-action.
 * Deep forest background, large editorial text, two CTA buttons.
 * FloatingLeaf decoration for organic warmth.
 */
export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        content.querySelectorAll(".cta-reveal"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: content, start: "top 78%" },
        }
      );

      gsap.fromTo(
        section.querySelectorAll(".cta-orbit-left"),
        { opacity: 0, x: -70, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.18,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%" },
        }
      );

      gsap.fromTo(
        section.querySelectorAll(".cta-orbit-right"),
        { opacity: 0, x: 70, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.18,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%" },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [content?.querySelectorAll(".cta-reveal"), section?.querySelectorAll(".cta-orbit-card")],
        { opacity: 1, x: 0, y: 0, scale: 1 }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--mentis-forest)] mentis-section relative overflow-hidden"
    >
      {/* Organic leaf decorations */}
      <FloatingLeaf className="top-[10%] right-[8%] opacity-20" delay={0.5} size="lg" />
      <FloatingLeaf className="bottom-[10%] left-[5%] opacity-15" delay={1.5} size="md" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(45,125,110,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Floating care signals — grid on mobile, orbiting cards on desktop */}
      <div className="relative z-10 mx-auto mb-12 grid max-w-xl grid-cols-1 gap-3 px-5 sm:grid-cols-2 lg:contents">
        {CARE_SIGNALS.map((signal, index) => (
          <div
            key={signal.title}
            className={`cta-orbit-card cta-orbit-${signal.side} opacity-0 lg:absolute lg:w-60 ${signal.position}`}
          >
            <div className="cta-card-float flex items-center gap-4 rounded-2xl border border-[var(--mentis-sage)]/30 bg-[var(--mentis-deep)]/75 p-5 text-left shadow-2xl backdrop-blur-md">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--mentis-teal)]/25 text-sm font-semibold text-[var(--mentis-sage-lt)]">
                0{index + 1}
                <span className="cta-card-ping absolute inset-0 rounded-full border border-[var(--mentis-sage)]/50" aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-sm font-medium text-[var(--mentis-light)]">{signal.title}</strong>
                <small className="mt-1 block text-xs leading-relaxed text-[var(--mentis-faint)]">{signal.detail}</small>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mentis-container relative z-10 text-center max-w-3xl mx-auto">
        <div ref={contentRef}>
          {/* Label */}
          <p
            className="cta-reveal text-xs tracking-[0.4em] uppercase text-[var(--mentis-sage)] mb-8 opacity-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Care Starts Here
          </p>

          {/* Headline */}
          <h2
            className="cta-reveal font-display text-4xl sm:text-5xl md:text-6xl font-light italic text-[var(--mentis-light)] leading-tight mb-8 opacity-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your next step<br />
            starts here.
          </h2>

          {/* Sub-copy */}
          <p
            className="cta-reveal text-base md:text-lg text-[var(--mentis-faint)] mb-12 leading-relaxed opacity-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Getting care should feel simple. Our doctors are here with expertise,
            clarity, and a plan made for you.
          </p>

          {/* Buttons */}
          <div className="cta-reveal flex flex-col sm:flex-row gap-5 justify-center opacity-0">
            <Button
              href="#contact"
              className="cta-button-primary cta-button-large relative w-full overflow-visible bg-[var(--mentis-light)] text-[var(--mentis-forest)] hover:bg-[var(--mentis-ivory)] border-transparent font-semibold sm:w-auto"
            >
              <span>Book a Visit</span>
              <span className="cta-button-arrow text-lg leading-none" aria-hidden="true">→</span>
            </Button>
            <Button
              variant="ghost"
              href="#contact"
              className="cta-button-secondary cta-button-large relative isolate w-full overflow-hidden border-[var(--mentis-sage-lt)] text-[var(--mentis-light)] hover:bg-[var(--mentis-teal)] hover:border-[var(--mentis-teal)] hover:text-white font-semibold sm:w-auto"
            >
              <span className="cta-button-sheen" aria-hidden="true" />
              <span className="relative z-10">Get in Touch</span>
              <span className="cta-button-arrow relative z-10 text-lg leading-none" aria-hidden="true">↗</span>
            </Button>
          </div>

          {/* Reassurance */}
          <p
            className="cta-reveal mt-8 text-xs text-[var(--mentis-faint)] opacity-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Personal &bull; Professional &bull; Patient-first
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTA;
