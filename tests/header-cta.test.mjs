import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const hero = await readFile(new URL("../components/sections/Hero.tsx", import.meta.url), "utf8");
const navbar = await readFile(new URL("../components/layout/Navbar.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("hero actions move into an animated compact header CTA", () => {
  assert.doesNotMatch(hero, /<Button/);
  assert.doesNotMatch(hero, /Our Services/);
  assert.match(navbar, /nav-book-button/);
  assert.match(navbar, /cta-button-arrow/);
  assert.match(css, /\.nav-book-button/);
  assert.match(css, /cta-button-pulse/);
});
