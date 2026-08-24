"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: "individual",
    number: "01",
    name: "General Consultations",
    description:
      "Focused consultations for everyday health concerns, symptoms, and clear next steps.",
  },
  {
    id: "couples",
    number: "02",
    name: "Preventive Care",
    description:
      "Health checks and proactive guidance that help patients stay well and spot concerns early.",
  },
  {
    id: "family",
    number: "03",
    name: "Specialist Referrals",
    description:
      "The right referral at the right time, with coordinated care from consultation through follow-up.",
  },
  {
    id: "child",
    number: "04",
    name: "Family Care",
    description:
      "Compassionate, practical care for children, adults, and the people who support them.",
  },
  {
    id: "assessment",
    number: "05",
    name: "Health Assessments",
    description:
      "Clear, thorough evaluations that give patients confidence in their health decisions.",
  },
  {
    id: "counselling",
    number: "06",
    name: "Ongoing Care",
    description:
      "Personalised follow-up and care plans designed around each patient's needs.",
  },
];

/**
 * Services — Elegant grid with individual card reveals.
 * Dark-on-stone colour scheme for contrast with surrounding light sections.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !grid) return;

    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        grid.querySelectorAll(".service-card"),
        { opacity: 0, y: 58, scale: 0.92, rotateX: 8, transformPerspective: 900 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          stagger: 0.14,
          duration: 1,
          ease: "power3.out",
          clearProps: "transform",
          immediateRender: false,
          scrollTrigger: {
            trigger: grid,
            start: "top 78%",
          },
        }
      );

      gsap.fromTo(
        grid.querySelectorAll(".service-divider"),
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          stagger: 0.14,
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: { trigger: grid, start: "top 76%" },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([heading, grid?.querySelectorAll(".service-card")], { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[var(--mentis-stone)] mentis-section"
    >
      <div className="mentis-container">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 md:mb-20 opacity-0">
          <p
            className="text-xs tracking-[0.4em] uppercase text-[var(--mentis-teal)] mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            What We Offer
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-light text-[var(--mentis-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Services
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--mentis-sand)]/40"
        >
          {SERVICES.map((service) => (
            <a
              key={service.id}
              href="#contact"
              aria-label={`Learn more about ${service.name}`}
              className="service-card group relative bg-[var(--mentis-stone)] p-7 md:p-8 overflow-hidden transition-all duration-500 hover:bg-[var(--mentis-ivory)]"
            >
              <span className="service-divider absolute inset-x-0 bottom-0 h-0.5 bg-[var(--mentis-teal)]/45" aria-hidden="true" />

              <span className="service-spotlight absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--mentis-teal)]/12 blur-2xl" aria-hidden="true" />

              {/* Organic hover shape */}
              <div
                className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[var(--mentis-teal)]/5 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                aria-hidden="true"
              />

              {/* Number */}
              <p
                className="service-number relative z-10 text-xs tracking-[0.3em] text-[var(--mentis-sand)] mb-6 font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {service.number}
              </p>

              {/* Leaf accent */}
              <div className="service-leaf relative z-10 mb-5" aria-hidden="true">
                <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
                  <path
                    d="M9,2 C13,8 16,15 13,22 C11,27 7,27 5,22 C2,15 5,8 9,2 Z"
                    fill="var(--mentis-teal)"
                    fillOpacity="0.5"
                  />
                  <line x1="9" y1="2" x2="9" y2="26" stroke="var(--mentis-teal)" strokeWidth="0.8" strokeOpacity="0.4" />
                </svg>
              </div>

              {/* Name */}
              <h3
                className="font-display text-xl md:text-2xl font-light text-[var(--mentis-text)] mb-3 group-hover:text-[var(--mentis-teal)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.name}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed text-[var(--mentis-muted)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {service.description}
              </p>

              {/* Hover arrow */}
              <div className="service-arrow relative z-10 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span
                  className="text-xs tracking-widest uppercase text-[var(--mentis-teal)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Learn more →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Footnote */}
        <p
          className="mt-8 text-xs text-[var(--mentis-muted)] text-center italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Services listed are subject to availability. Contact us to discuss your specific needs.
        </p>
      </div>
    </section>
  );
}

export default Services;
