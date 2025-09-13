import React, { useLayoutEffect, useRef } from "react";
import Footer from "./Footer";
import gsap from "gsap";
import PrimaryButton from "./buttons/PrimaryButton";
import AnimatedBackground from "./Background/AnimatedBackground";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import CountUpOnVisible from "./helpers/CountUpOnVisible";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Technologies = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Split en el H1 principal (por palabras)
      const h1El = section.querySelector("h1");
      let h1Inner;
      if (h1El) {
        new SplitText(h1El, {
          type: "words",
          wordsClass: "wordWrapper overflow-hidden inline-block",
        });
        h1Inner = new SplitText(h1El, { type: "words" }); // h1Inner.words
      }

      const topBtn = section.querySelector(".top-btn");
      const metrics = gsap.utils.toArray(".metric-block");
      const mobileBtn = section.querySelector(".mobile-btn");

      // Timeline de intro
      const tl = gsap.timeline({ paused: true });

      if (h1Inner?.words?.length) {
        tl.from(
          h1Inner.words,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.3, // <= 0.3s
            ease: "power2.out",
            stagger: 0.05,
          },
          0
        );
      }

      if (topBtn) {
        tl.from(
          topBtn,
          {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      if (metrics.length) {
        tl.from(
          metrics,
          {
            y: 30,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.1,
          },
          "+=0.1"
        );
      }

      if (mobileBtn) {
        tl.from(
          mobileBtn,
          {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, sectionRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className=" relative h-screen bg-primary  w-full px-8 text-primary isolate"
    >
      <div className="absolute inset-0 -z-1 opacity-80 bg-black"></div>
      <AnimatedBackground />
      <div className="flex flex-col h-[65%] lg:h-[55%]  justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-translate-y-[10%]  w-full px-8 lg:py-8">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-[2.1rem] lg:text-6xl font-bold text-left">
            Numbers don't lie
          </h1>

          <PrimaryButton
            href="/technologies"
            className="top-btn hidden lg:block bg-primary !p-3  hover:bg-white/10 hover:text-primary active:bg-white/10 active:text-primary text-lg text-secondary self-center"
          >
            Explore Technology
          </PrimaryButton>
        </div>

        <div className="flex lg:flex-row flex-col w-full px-4">
          <div className="metric-block flex flex-col justify-center items-center w-full relative">
            <span className="absolute -top-5 lg:top-0 left-0 -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-primary opacity-40 text-2xl lg:text-3xl">
              +
            </span>
            <span className="absolute -top-5 right-0 lg:right-full lg:bottom-0 lg:top-auto translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-primary opacity-40 text-2xl lg:text-3xl">
              +
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold">
              <CountUpOnVisible
                prefix={""}
                suffix="+"
                start={100}
                end={200}
                duration={3}
              />
            </h2>
            <h3 className="opacity-60 text-xs lg:text-sm">
              mph wind Engineering
            </h3>
          </div>
          <div className="metric-block relative flex flex-col justify-center items-center w-full my-5 py-5">
            {/* Línea superior más corta */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[0.5px] lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:w-[0.5px] lg:h-[85%] bg-primary" />

            {/* Línea inferior más corta */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[0.5px] lg:w-[0.5px] lg:h-[85%] lg:top-1/2 lg:left-full lg:-translate-y-1/2 bg-primary" />

            {/* Signos + */}
            <span className="lg:hidden absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-primary opacity-40 text-2xl">
              +
            </span>
            <span className="lg:hidden absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-primary opacity-40 text-2xl">
              +
            </span>
            <span className="lg:hidden absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-primary opacity-40 text-2xl">
              +
            </span>
            <span className="lg:hidden absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-primary opacity-40 text-2xl">
              +
            </span>

            {/* Contenido */}
            <h2 className="text-3xl lg:text-4xl font-bold">
              <CountUpOnVisible
                prefix={"~"}
                suffix="%"
                start={10}
                end={30}
                duration={3}
              />
            </h2>
            <h3 className="opacity-60 text-xs lg:text-sm">lower build costs</h3>
          </div>
          <div className="metric-block flex flex-col justify-center items-center w-full relative pb-7 lg:pb-0">
            <span className="absolute -bottom-6 lg:top-0 left-0 lg:left-full -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 h-fit text-primary opacity-40 text-2xl lg:text-3xl">
              +
            </span>
            <span className="absolute -bottom-6 right-0 translate-x-1/2 -translate-y-1/2 lg:translate-y-0 lg:bottom-0 text-primary opacity-40 text-2xl lg:text-3xl">
              +
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold">
              {" "}
              <CountUpOnVisible
                prefix={""}
                suffix=""
                start={30}
                end={60}
                duration={3}
              />
              <CountUpOnVisible
                prefix={"-"}
                suffix="%"
                start={40}
                end={70}
                duration={3}
              />
            </h2>
            <h3 className="opacity-60 text-xs lg:text-sm">faster schedules</h3>
          </div>
        </div>
        <PrimaryButton
          href="/technologies"
          className="mobile-btn lg:hidden bg-primary hover:bg-white/10 hover:text-primary active:bg-white/10 active:text-primary text-secondary self-center"
        >
          Explore Technology
        </PrimaryButton>
        <footer
          className={`hidden lg:grid grid-cols-3 grid-flow-col w-full items-center text-sm lg:text-lg font-bold`}
        >
          <a
            href="/"
            className="hover:text-white transition-colors duration-300 justify-self-start"
          >
            Investments
          </a>
          <a
            href="/"
            className="hover:text-white transition-colors duration-300 justify-self-center"
          >
            Projects
          </a>
          <a
            href="/"
            className="hover:text-white transition-colors duration-300 justify-self-end"
          >
            Technologies
          </a>
        </footer>
      </div>
      <Footer className={"lg:hidden"} />
    </section>
  );
};

export default Technologies;
