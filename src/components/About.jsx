import React, { useLayoutEffect, useRef } from "react";
import Footer from "./Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    const body = document.body;
    const original = getComputedStyle(body).backgroundColor;
    const dark = "#0f1931";

    const ctx = gsap.context(() => {
      const toDark = () =>
        gsap.to(body, {
          backgroundColor: dark,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      const toOrig = () =>
        gsap.to(body, {
          backgroundColor: original,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });

      // Disparo a los 50% (bajando o subiendo dentro de la zona)
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 50%",
        onEnter: toDark,
        onEnterBack: toDark,
      });

      // Reverso a los 40% cuando subes y sales por arriba
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 40%",
        onLeaveBack: toOrig,
      });

      // ✅ Integración opcional con Lenis si lo usas (global o injéctalo tú)
      if (window.lenis) {
        window.lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => window.lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }
    }, aboutRef);

    return () => {
      ctx.revert();
      // Restablecer color al desmontar
      gsap.to(body, {
        backgroundColor: original,
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
            At DDC Developments, we are dedicated to transforming the
            construction industry with a strong commitment to environmental
            responsibility. By leveraging cutting-edge technologies like our
            modular systems, we offer innovative and sustainable solutions that
            redefine efficiency and performance. Our disruptive approach
            positions us as an industry leader, driving progress and shaping the
            future of construction.
          </p>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default About;
