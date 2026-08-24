import React from "react";

interface ButtonProps {
  variant?: "primary" | "ghost" | "text";
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

/**
 * Reusable Button component for Mentis.
 * primary — filled teal button
 * ghost   — outlined, transparent fill
 * text    — underline-reveal link style
 */
export function Button({
  variant = "primary",
  href,
  children,
  onClick,
  className = "",
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 cursor-pointer select-none";

  const variants: Record<string, string> = {
    primary:
      "px-7 py-3.5 rounded-full text-sm bg-[var(--mentis-teal)] text-[var(--mentis-light)] hover:bg-[var(--mentis-teal-lt)] hover:scale-[1.03] active:scale-[0.98] shadow-sm",
    ghost:
      "px-7 py-3.5 rounded-full text-sm border border-current text-[var(--mentis-teal)] hover:bg-[var(--mentis-teal)] hover:text-[var(--mentis-light)] hover:scale-[1.03] active:scale-[0.98]",
    text: "text-sm underline-offset-4 hover:underline opacity-80 hover:opacity-100 px-0 py-1",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default Button;
