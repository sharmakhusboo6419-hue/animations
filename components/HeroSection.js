"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImpactStats from "./ImpactStats";
import ProductCan from "./ProductCan";

gsap.registerPlugin(ScrollTrigger);

// Keeps pinning in sync with mobile URL-bar height changes
if (typeof window !== "undefined") {
  ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
}

const HEADLINE = ["WELCOME", "ITZ", "FIZZ"];

export default function HeroSection() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let mm;
    const cleanupFns = [];
    let isUnmounted = false;

    const ctx = gsap.context(() => {
      const headlineChars = root.querySelectorAll(".headline-char");
      const tagline = root.querySelector(".hero-tagline");
      const stats = root.querySelectorAll(".stat-item");
      const can = root.querySelector(".can-stage");
      const decor = root.querySelectorAll(".hero-decor");
      const cue = root.querySelector(".scroll-cue");
      const brandCopy = root.querySelector(".brand-reveal");
      const rings = root.querySelectorAll(".focus-ring");
      const copyBlock = root.querySelector(".hero-copy");

      if (reduceMotion) {
        gsap.set([headlineChars, tagline, stats, can, decor, cue], {
          clearProps: "all",
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
        });
        gsap.set([brandCopy, rings], { opacity: 0 });
        return;
      }

      gsap.set(headlineChars, { opacity: 0, y: 28 });
      gsap.set(tagline, { opacity: 0, y: 18 });
      gsap.set(stats, { opacity: 0, y: 16 });
      gsap.set(can, { opacity: 0, y: 48, scale: 0.92, rotate: -8 });
      gsap.set(decor, { opacity: 0 });
      gsap.set(cue, { opacity: 0, y: 10 });
      gsap.set(brandCopy, { opacity: 0, y: 24 });
      gsap.set(rings, { opacity: 0, scale: 0.86 });

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.12,
      });

      introTl
        .to(decor, { opacity: 1, duration: 0.8, stagger: 0.08 }, 0)
        .to(
          headlineChars,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.028,
            ease: "power2.out",
          },
          0.12,
        )
        .to(tagline, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .to(
          stats,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.2",
        )
        .to(
          can,
          { opacity: 1, y: 0, scale: 1, rotate: -8, duration: 0.85 },
          "-=0.45",
        )
        .to(cue, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");

      mm = gsap.matchMedia();

      const scrollOptions = {
        trigger: pinRef.current,
        start: "top top",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinReparent: false,
      };

      mm.add("(min-width: 768px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            ...scrollOptions,
            end: "+=230%",
          },
          defaults: { ease: "none" },
        });

        scrollTl
          .to(can, { rotate: -4, xPercent: -6, scale: 1.02, duration: 0.2 }, 0)
          .to(
            copyBlock,
            { opacity: 0, y: -40, x: -24, duration: 0.35 },
            0.12,
          )
          .to(cue, { opacity: 0, duration: 0.15 }, 0.1)
          .to(
            can,
            {
              xPercent: -28,
              yPercent: 8,
              rotate: 12,
              scale: 0.92,
              duration: 0.35,
            },
            0.22,
          )
          .to(
            can,
            {
              xPercent: 8,
              yPercent: 4,
              rotate: -6,
              scale: 1.12,
              duration: 0.28,
            },
            0.55,
          )
          .to(
            rings,
            { opacity: 0.55, scale: 1, stagger: 0.06, duration: 0.2 },
            0.62,
          )
          .to(brandCopy, { opacity: 1, y: 0, duration: 0.22 }, 0.64)
          .to(
            can,
            {
              xPercent: 2,
              yPercent: 0,
              rotate: 0,
              scale: 1.08,
              duration: 0.2,
            },
            0.82,
          );
      });

      mm.add("(max-width: 767px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            ...scrollOptions,
            end: "+=220%",
          },
          defaults: { ease: "none" },
        });

        scrollTl
          .to(copyBlock, { opacity: 0, y: -28, duration: 0.3 }, 0.08)
          .to(cue, { opacity: 0, duration: 0.12 }, 0.08)
          .to(
            can,
            { xPercent: -6, yPercent: -20, rotate: 10, scale: 1.08, duration: 0.34 },
            0.1,
          )
          .to(
            can,
            { xPercent: 7, yPercent: -8, rotate: -5, scale: 1.12, duration: 0.3 },
            0.46,
          )
          .to(rings, { opacity: 0.45, scale: 1, duration: 0.2 }, 0.52)
          .to(brandCopy, { opacity: 1, y: 0, duration: 0.22 }, 0.54)
          .to(
            can,
            { xPercent: 0, yPercent: 0, rotate: 0, scale: 1.04, duration: 0.22 },
            0.76,
          );
      });

      const refreshScroll = () => {
        if (!isUnmounted) ScrollTrigger.refresh();
      };

      const rafOne = requestAnimationFrame(() => {
        const rafTwo = requestAnimationFrame(refreshScroll);
        cleanupFns.push(() => cancelAnimationFrame(rafTwo));
      });
      cleanupFns.push(() => cancelAnimationFrame(rafOne));

      const onLoad = () => refreshScroll();
      window.addEventListener("load", onLoad);
      cleanupFns.push(() => window.removeEventListener("load", onLoad));

      const images = Array.from(root.querySelectorAll("img"));
      const pending = images.filter((img) => !img.complete);
      if (pending.length) {
        const imagePromises = pending.map(
          (img) =>
            new Promise((resolve) => {
              const done = () => resolve();
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
            }),
        );
        Promise.all(imagePromises).then(refreshScroll);
      }
    }, root);

    return () => {
      isUnmounted = true;
      cleanupFns.forEach((cleanup) => cleanup());
      if (mm) mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative bg-fizz-void">
      <div ref={pinRef} className="relative h-dvh overflow-hidden">
        <div className="hero-decor pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(139,45,60,0.28),transparent_42%),radial-gradient(circle_at_82%_70%,rgba(201,166,107,0.12),transparent_36%),linear-gradient(180deg,#14090d_0%,#1c1014_48%,#10080c_100%)]" />
        <div className="hero-grain hero-decor absolute inset-0" />

        <div className="hero-decor pointer-events-none absolute inset-6 border border-fizz-cream/10 sm:inset-8" />
        <div className="hero-decor pointer-events-none absolute left-6 right-6 top-6 h-px bg-fizz-gold/30 sm:left-8 sm:right-8 sm:top-8" />

        <header className="hero-decor relative z-20 flex items-center justify-between px-8 pt-10 sm:px-12 sm:pt-12">
          <p className="font-display text-[11px] tracking-[0.48em] text-fizz-cream">
            ITZ FIZZ
          </p>
          <p className="font-display text-[10px] tracking-[0.38em] text-fizz-cream/45">
            EDITION 01
          </p>
        </header>

        <div className="relative z-20 mx-auto grid h-[calc(100dvh-5.5rem)] max-w-7xl grid-cols-1 items-center overflow-y-auto px-8 pb-16 pt-4 sm:px-12 lg:h-[calc(100dvh-5.5rem)] lg:min-h-[580px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:overflow-visible lg:pb-10">
          <div className="hero-copy relative z-20 order-2 lg:order-1">
            <h1 className="font-display text-[clamp(2.4rem,7vw,6.4rem)] font-medium leading-[0.92] tracking-[0.18em] text-fizz-cream sm:tracking-[0.28em]">
              {HEADLINE.map((word) => (
                <span key={word} className="mr-[0.35em] inline-block">
                  {word.split("").map((char, index) => (
                    <span
                      key={`${word}-${index}`}
                      className="headline-char inline-block"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="hero-tagline mt-6 max-w-md font-serif text-lg italic leading-relaxed text-fizz-cream/75 sm:text-2xl">
              Sparkling citrus energy, poured cold and lifted with a bright,
              restless fizz.
            </p>
            <ImpactStats />
          </div>

          <div className="relative order-1 flex h-[36dvh] min-h-[220px] items-center justify-center lg:order-2 lg:h-full lg:min-h-0">
            <div className="focus-ring pointer-events-none absolute h-[58%] w-[58%] rounded-full border border-fizz-gold/25" />
            <div className="focus-ring pointer-events-none absolute h-[74%] w-[74%] rounded-full border border-fizz-cream/10" />
            <div className="can-stage relative z-10 will-change-transform">
              <ProductCan />
            </div>
          </div>
        </div>

        <p className="brand-reveal pointer-events-none absolute bottom-24 left-1/2 z-30 w-[min(90%,28rem)] -translate-x-1/2 text-center font-serif text-2xl italic text-fizz-cream opacity-0 sm:bottom-28 sm:text-4xl">
          Crisp. Bright. Endlessly alive.
        </p>

        <div className="scroll-cue absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="font-display text-[9px] tracking-[0.4em] text-fizz-cream/50">
            SCROLL
          </span>
          <span className="scroll-cue-line block h-8 w-px bg-fizz-gold" />
        </div>
      </div>
    </section>
  );
}
