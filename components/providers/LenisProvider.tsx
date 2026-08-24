"use client";

import { useEffect, createContext, useContext, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Context to optionally expose Lenis instance to consumers
const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: React.ReactNode;
}

/**
 * LenisProvider — single Lenis instance for the entire app.
 * Syncs Lenis RAF with GSAP ticker so ScrollTrigger works correctly.
 * Cleans up completely on unmount.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker for ScrollTrigger compatibility
    function onRaf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
