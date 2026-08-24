"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Placeholder therapist data — replace with real profiles
const DOCTORS = [
  {
    id: "t1",
    name: "[Doctor Name]",
    role: "Lead Physician",
    specialisation: "General Medicine · Preventive Care · Health Checks",
    bio: "An experienced doctor committed to clear advice, careful diagnosis, and thoughtful long-term care.",
  },
  {
    id: "t2",
    name: "[Doctor Name]",
    role: "Consultant Specialist",
    specialisation: "Specialist Consultations · Treatment Plans · Follow-up Care",
    bio: "A patient-first doctor who makes complex health decisions feel clear and manageable.",
  },
  {
    id: "t3",
    name: "[Doctor Name]",
    role: "Family & Child Doctor",
    specialisation: "Family Care · Children's Health · Ongoing Wellness",
    bio: "Provides welcoming, practical care for children, adults, and families at every stage of life.",
  },
];

/**
 * Therapists — Premium team section with placeholder profiles.
 * Structured for easy replacement with real data.
 */
export function Therapists() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

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
        cards.querySelectorAll(".therapist-card"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: cards, start: "top 78%" },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([heading, cards?.querySelectorAll(".therapist-card")], { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="bg-[var(--mentis-ivory)] mentis-section"
    >
      <div className="mentis-container">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <p
            className="text-xs tracking-[0.4em] uppercase text-[var(--mentis-teal)] mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our People
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-light text-[var(--mentis-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Meet the Care Team
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {DOCTORS.map((t) => (
            <div
              key={t.id}
              className="therapist-card group opacity-0"
            >
              {/* Profile image placeholder */}
              <div className="relative mb-6 overflow-hidden rounded-[2px]">
                <div
                  className="w-full aspect-[4/5] bg-[var(--mentis-stone)] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
                  aria-label="Doctor profile photo placeholder"
                >
                  {/* Organic placeholder */}
                  <svg
                    viewBox="0 0 200 250"
                    fill="none"
                    className="w-32 h-40 opacity-30"
                    aria-hidden="true"
                  >
                    {/* Silhouette */}
                    <circle cx="100" cy="80" r="38" fill="var(--mentis-sage)" />
                    <path
                      d="M40,240 C40,185 65,165 100,165 C135,165 160,185 160,240"
                      fill="var(--mentis-sage)"
                    />
                    {/* Leaf motif overlay */}
                    <path
                      d="M100,20 C115,35 125,55 118,75 C112,90 88,90 82,75 C75,55 85,35 100,20 Z"
                      fill="var(--mentis-teal)"
                      fillOpacity="0.4"
                    />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <p
                className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--mentis-teal)] mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.role}
              </p>
              <h3
                className="font-display text-2xl font-light text-[var(--mentis-text)] mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.name}
              </h3>
              <p
                className="text-xs text-[var(--mentis-sand)] mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.specialisation}
              </p>
              <p
                className="text-sm leading-relaxed text-[var(--mentis-muted)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder note */}
        <p
          className="mt-12 text-xs text-[var(--mentis-muted)] text-center italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Doctor profiles are placeholders — add your practice team information here.
        </p>
      </div>
    </section>
  );
}

export default Therapists;
