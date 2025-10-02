import React, { useLayoutEffect, useRef } from "react";
import Header from "./Header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";
import PrimaryButton from "./buttons/PrimaryButton";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Cover = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const buildRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const tlRef = useRef(null);

  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    const build = buildRef.current;
    const container = containerRef.current;
    const section = sectionRef.current;

    // ---------- PARALLAX DEL FONDO ----------
    const ctx = gsap.context(() => {
      gsap.to(section, {
        duration: 1,
        ease: "none",
        "--bg-y": "30vh",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    // ---------- ANIMACIÓN "BUILD" ----------
    const anchors = [leftRef.current, centerRef.current, rightRef.current];

    const makeTimeline = () => {
      tlRef.current && tlRef.current.kill();

      const c = container.getBoundingClientRect();
      const b = build.getBoundingClientRect();
      const [l, m, r] = anchors.map((a) => a.getBoundingClientRect());

      // Altura relativa
      const yOffset = -(b.height + l.height) * 0.5;

      // Alineaciones solicitadas
      const xLeft = l.left - c.left; // izquierda con la primera
      const xCenter = m.left + (m.width - b.width) / 2 - c.left; // centrada con la segunda
      const xRight = r.right - b.width - c.left; // derecha con la tercera

      // 👉 aplicar set inicial y mostrar el build
      gsap.set(build, { x: xLeft, y: yOffset, visibility: "visible" });

      tlRef.current = gsap
        .timeline({
          delay: 0.5,
          repeat: -1,
          yoyo: true,
          defaults: { duration: 1.6, ease: "power2.inOut" },
        })
        .to(build, { x: xCenter }, "+=0.3")
        .to(build, { x: xRight }, "+=0.8")
        .to(build, { duration: 0.5 });
    };

    const ready = () => makeTimeline();
    if (document.fonts?.ready) document.fonts.ready.then(ready);
    else setTimeout(ready, 0);

    const onResize = () => makeTimeline();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tlRef.current && tlRef.current.kill();
      ctx.revert();
    };
  }, [i18n.language]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative cover h-[100svh] w-full px-8 pb-8 pt-16"
    >
      <Header />
      <div
        ref={containerRef}
        className="relative grid grid-flow-col grid-cols-3 items-center w-full
                   top-1/2 left-1/2 -translate-x-1/2 -translate-y-full
                   h-auto font-bold text-primary lg:text-5xl"
      >
        <h1 ref={leftRef} className="justify-self-start z-10">
          {t("cover.faster")}
        </h1>
        <h1 ref={centerRef} className="justify-self-center z-10">
          {t("cover.stronger")}
        </h1>
        <h1 ref={rightRef} className="justify-self-end z-10">
          {t("cover.smarter")}
        </h1>

        <h1
          ref={buildRef}
          className="absolute -top-1 lg:-top-4 left-0 pointer-events-none select-none will-change-transform
                     text-transparent font-extrabold text-3xl lg:text-8xl whitespace-nowrap"
          style={{
            WebkitTextStroke: "1px #c2c7cf",
            visibility: "hidden", // 👈 oculto hasta que gsap lo setee
          }}
        >
          {t("cover.build")}
        </h1>
      </div>

      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:bottom-[10%] px-8 w-full gap-8 lg:gap-5 lg:justify-between grid grid-rows-2 lg:grid-cols-2">
        <h2 className="justify-self-start self-start lg:max-w-[60%] text-sm lg:text-lg">
          {t("cover.description")}
        </h2>
        <PrimaryButton
          href="/investments/#appointment"
          className="text-primary justify-self-end bg-gray-200 hover:!bg-primary hover:text-secondary transition-all duration-200 bg-opacity-15"
        >
          {t("cover.button")}
        </PrimaryButton>
      </div>

      <Footer />
    </section>
  );
};

export default Cover;
