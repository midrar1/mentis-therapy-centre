"use client";

import { useState } from "react";
import { Preloader } from "@/components/sections/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { About } from "@/components/sections/About";
import { Therapists } from "@/components/sections/Therapists";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return <>
    <Preloader onComplete={() => setPreloaderDone(true)} />
    <div className={`transition-opacity duration-700 ${preloaderDone ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Intro />
        <Services />
        <Approach />
        <About />
        <Therapists />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  </>;
}
