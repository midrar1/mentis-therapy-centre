import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cta = await readFile(new URL("../components/sections/CTA.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("contact CTA exposes visible animated button treatments", () => {
  assert.match(cta, /cta-button-primary/);
  assert.match(cta, /cta-button-secondary/);
  assert.match(cta, /cta-button-arrow/);
  assert.match(cta, /cta-button-sheen/);
  assert.match(css, /@keyframes cta-button-pulse/);
  assert.match(css, /@keyframes cta-button-sheen/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("contact CTA includes four responsive floating care cards and larger actions", () => {
  assert.match(cta, /cta-orbit-card/g);
  assert.match(cta, /Same-week appointments/);
  assert.match(cta, /Qualified doctors/);
  assert.match(cta, /Personal care plans/);
  assert.match(cta, /Easy follow-up/);
  assert.match(cta, /cta-button-large/);
  assert.match(css, /@keyframes cta-card-float/);
  assert.match(css, /\.cta-orbit-card/);
});
