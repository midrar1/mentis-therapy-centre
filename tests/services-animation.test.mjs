import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const services = await readFile(new URL("../components/sections/Services.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("service cards expose wave, spotlight, leaf, divider, and arrow motion hooks", () => {
  assert.match(services, /service-spotlight/);
  assert.match(services, /service-leaf/);
  assert.match(services, /service-number/);
  assert.match(services, /service-arrow/);
  assert.match(services, /service-divider/);
  assert.match(css, /@keyframes service-leaf-breathe/);
  assert.match(css, /\.service-card:hover/);
  assert.match(css, /\.service-card:focus-within/);
});

test("service cards remain compact and visible before scroll animation starts", () => {
  assert.doesNotMatch(services, /service-card[^\n]*opacity-0/);
  assert.match(services, /immediateRender: false/);
  assert.doesNotMatch(css, /\.service-card \{[^}]*min-height:/s);
  assert.match(css, /translateY\(-6px\) scale\(1\.008\)/);
});
