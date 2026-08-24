import React from "react";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Team", href: "#team" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[var(--mentis-deep)] text-[var(--mentis-faint)]"
    >
      <div className="mentis-container py-20 md:py-24">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <p
              className="font-display text-3xl font-light tracking-[0.2em] text-[var(--mentis-light)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PRIVATE
            </p>
            <p
              className="text-xs tracking-[0.35em] uppercase text-[var(--mentis-faint)] mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              PRACTICE
            </p>
            <p className="text-sm leading-relaxed max-w-xs text-[var(--mentis-faint)]" style={{ fontFamily: "var(--font-body)" }}>
              Thoughtful care, clear answers, and a better patient experience.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase text-[var(--mentis-sage)] mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Navigate
            </p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-[var(--mentis-light)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (placeholder) */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase text-[var(--mentis-sage)] mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Reach Out
            </p>
            <ul className="space-y-3 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>
                <a
                  href="tel:[phone-number]"
                  className="hover:text-[var(--mentis-light)] transition-colors duration-300"
                >
                  [Phone Number]
                </a>
              </li>
              <li>
                <a
                  href="mailto:[email]"
                  className="hover:text-[var(--mentis-light)] transition-colors duration-300"
                >
                  [Email Address]
                </a>
              </li>
              <li className="leading-relaxed text-[var(--mentis-faint)]">
                [Clinic Address]
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10">
          <p className="text-xs tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
            &copy; {new Date().getFullYear()} Private Practice. All rights reserved.
          </p>
          <p
            className="text-xs italic font-light text-[var(--mentis-sage)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Care &bull; Trust &bull; Progress
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
