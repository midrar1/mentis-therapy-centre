import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const intro = await readFile(new URL("../components/sections/Intro.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("promise section uses professional generic copy and layered motion hooks", () => {
  assert.doesNotMatch(intro, /Mentis/);
  assert.doesNotMatch(intro, /healing is not a destination/);
  assert.match(intro, /promise-line/g);
  assert.match(intro, /promise-leaf/);
  assert.match(intro, /promise-leaf-path/);
  assert.match(intro, /promise-orb-one/);
  assert.match(intro, /promise-orb-two/);
  assert.match(css, /@keyframes promise-orbit/);
  assert.match(css, /@keyframes promise-leaf-float/);
});
