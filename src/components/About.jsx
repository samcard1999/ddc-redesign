import React, { useLayoutEffect, useRef } from "react";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    const section = aboutRef.current;
    if (!section) return;

    const body = document.body;
    const originalBg = getComputedStyle(body).backgroundColor;
    const darkBg = "#0f1931";

    const ctx = gsap.context(() => {
      // -------- Helpers de fondo --------
      const toDark = () =>
        gsap.to(body, {
          backgroundColor: darkBg,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

      const toOrig = () =>
        gsap.to(body, {
          backgroundColor: originalBg,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

      // -------- SplitText en títulos (por PALABRAS) --------
      const h1El = section.querySelector("h1");
      const h2El = section.querySelector("h2");
      const pEl = section.querySelector("p");

      // Creamos splitters:
      // - outer: añade wrappers por palabra con overflow-hidden
      // - inner: genera spans de palabra a animar (inner.words)
      let h1Inner, h2Inner;

      if (h1El) {
        new SplitText(h1El, {
          type: "words",
          wordsClass: "wordWrapper overflow-hidden inline-block",
        });
        h1Inner = new SplitText(h1El, { type: "words" }); // h1Inner.words
      }

      if (h2El) {
        new SplitText(h2El, {
          type: "words",
          wordsClass: "wordWrapper overflow-hidden inline-block",
        });
        h2Inner = new SplitText(h2El, { type: "words" }); // h2Inner.words
      }

      // -------- Timeline de intro (solo una vez) --------
      const introTl = gsap.timeline({ paused: true });

      // H1 por palabras: desde abajo (yPercent 100 -> 0)
      if (h1Inner?.words?.length) {
        introTl.from(
          h1Inner.words,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.04,
          },
          0
        );
      }

      // H2 por palabras: solapado ligeramente tras H1
      if (h2Inner?.words?.length) {
        introTl.from(
          h2Inner.words,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.04,
          },
          h1Inner ? "+=0.05" : 0
        );
      }

      // Párrafo: coordinado con el final de H2
      if (pEl) {
        gsap.set(pEl, { y: 16, opacity: 0, willChange: "transform,opacity" });
        introTl.to(
          pEl,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.10"
        );
      }

      // Disparo de intro UNA sola vez
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          toDark();
          introTl.play();
        },
      });

      // Triggers del color de fondo (reversibles)
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        onEnter: toDark,
        onEnterBack: toDark,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        onLeaveBack: toOrig,
      });

      // Integración opcional con Lenis (si existe globalmente)
      if (window.lenis) {
        window.lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => window.lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }
    }, aboutRef);

    // Asegura cálculo correcto tras el primer paint
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      // Restablecer color al desmontar
      gsap.to(body, {
        backgroundColor: originalBg,
        duration: 0.2,
        overwrite: "auto",
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative w-full h-screen px-8 bg-primary text-secondary"
    >
      <div className="absolute px-8 lg:px-12 left-0 top-1/2 -translate-y-full flex flex-col lg:flex-row lg:justify-between items-end gap-4 w-full">
        <h1 className="text-5xl lg:text-5xl font-bold">About</h1>
        <h2 className="text-2xl lg:text-5xl max-w-[94%] lg:max-w-[70%] font-bold text-right">
          The future is not Waited, it is built
        </h2>
      </div>

      <div className="absolute left-0 top-3/4 -translate-y-2/3 lg:-translate-y-full w-full px-8 lg:px-12">
        <div className="relative">
          <span className="absolute -top-6 left-0 -translate-x-1/2 -translate-y-1/2 text-secondary opacity-40 text-2xl">
            +
          </span>
          <span className="absolute -top-6 right-0 translate-x-1/2 -translate-y-1/2 text-secondary opacity-40 text-2xl">
            +
          </span>
          <span className="absolute -bottom-6 left-0 -translate-x-1/2 translate-y-1/2 text-secondary opacity-40 text-2xl">
            +
          </span>
          <span className="absolute -bottom-6 right-0 translate-x-1/2 translate-y-1/2 text-secondary opacity-40 text-2xl">
            +
          </span>

          <p className="relative text-sm lg:text-lg lg:max-w-[99%]">
            DDC Developments is transforming construction with a steadfast
            commitment to environmental responsibility. We deploy cutting-edge
            technologies including modular systems from our partners’ facilities
            in Florida to deliver innovative, sustainable solutions that
            redefine efficiency and performance; this partnership-driven,
            disruptive approach positions us as an industry leader shaping the
            future of construction.
          </p>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default About;
