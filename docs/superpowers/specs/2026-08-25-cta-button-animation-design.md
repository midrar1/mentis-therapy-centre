# CTA Button Animation Design

The existing CTA layout remains unchanged. `Book a Visit` receives a restrained breathing glow and animated arrow to establish primary hierarchy. `Get in Touch` receives a brighter outline and a traveling sheen to remain visible as the secondary action. Both animations pause on hover and are disabled by the existing reduced-motion rule.

The implementation is isolated to `components/sections/CTA.tsx` and `app/globals.css`. A source-level Node test verifies the CTA hooks and animation rules remain present.
