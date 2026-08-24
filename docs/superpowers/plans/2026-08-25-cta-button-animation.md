# CTA Button Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the two contact CTA buttons more visible with elegant, accessible motion.

**Architecture:** Add CTA-specific class hooks and decorative spans in the existing component, then define isolated keyframes in the global stylesheet. Keep the shared Button API unchanged.

**Tech Stack:** React 19, Next.js 16, Tailwind CSS 4, CSS keyframes, Node test runner.

---

### Task 1: CTA animation hooks

**Files:**
- Create: `tests/cta-animation.test.mjs`
- Modify: `components/sections/CTA.tsx`
- Modify: `app/globals.css`

- [ ] Write and run a failing source-contract test for both animation hooks, arrow, sheen, and reduced-motion handling.
- [ ] Add the primary and secondary CTA markup hooks.
- [ ] Add isolated glow, arrow, and sheen CSS animations.
- [ ] Run the source-contract test, lint, and production build.
