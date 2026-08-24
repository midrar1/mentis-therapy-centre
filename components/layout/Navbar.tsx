"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-based nav appearance
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "80px top",
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  // Mobile menu GSAP animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (menuOpen) {
      gsap.to(menu, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        pointerEvents: "auto",
      });
      gsap.fromTo(
        menu.querySelectorAll(".mobile-nav-item"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.45, ease: "power2.out", delay: 0.1 }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        duration: 0.35,
        ease: "power2.in",
        pointerEvents: "none",
      });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  return (
    <>
      <header
        ref={navRef}
        className={`
          fixed top-0 inset-x-0 z-50 transition-all duration-500
          ${
            scrolled
              ? "bg-[var(--mentis-deep)]/90 backdrop-blur-md border-b border-white/5 py-3"
              : "bg-transparent py-5"
          }
        `}
      >
        <div className="mentis-container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex flex-col leading-none group focus-visible:outline-2"
            aria-label="Private Practice — Home"
          >
            <span
              className="font-display text-2xl font-light tracking-[0.18em] text-[var(--mentis-light)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PRIVATE
            </span>
            <span
              className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--mentis-faint)] mt-0.5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              PRACTICE
            </span>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-[var(--mentis-faint)] hover:text-[var(--mentis-light)] transition-colors duration-300 relative group py-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--mentis-sage)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              href="#contact"
              className="nav-book-button cta-button-primary relative overflow-visible border-transparent bg-[var(--mentis-light)] text-[var(--mentis-forest)] hover:bg-white text-xs tracking-widest uppercase font-semibold"
            >
              <span>Book a Visit</span>
              <span className="cta-button-arrow text-base leading-none" aria-hidden="true">→</span>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 group focus-visible:outline-2 rounded"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-6 bg-[var(--mentis-light)] transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-[var(--mentis-light)] transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-[var(--mentis-light)] transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[var(--mentis-deep)] flex flex-col justify-center items-center gap-8 opacity-0 pointer-events-none md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="mobile-nav-item font-display text-4xl font-light text-[var(--mentis-light)] hover:text-[var(--mentis-sage)] transition-colors duration-300"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button
          href="#contact"
          onClick={closeMenu}
          className="mobile-nav-item nav-book-button cta-button-primary relative mt-4 overflow-visible bg-[var(--mentis-light)] text-[var(--mentis-forest)]"
        >
          <span>Book a Visit</span>
          <span className="cta-button-arrow text-base leading-none" aria-hidden="true">→</span>
        </Button>
      </div>
    </>
  );
}

export default Navbar;
