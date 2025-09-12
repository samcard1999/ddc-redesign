// ./Hooks/useSplitWords.js
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// IMPORTANTE: Debes tener el plugin disponible en tu build
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

export function useSplitWords(
  selector = ".split-words",
  {
    duration = 0.3,
    ease = "power2.out",
    stagger = 0.05,
    start = "top 80%",
  } = {}
) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // 1) Verifica que el plugin exista
    if (!SplitText) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
          "[useSplitWords] SplitText no está disponible. Asegúrate de tener el plugin de GSAP (Club)."
        );
      }
      return;
    }

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);

      targets.forEach((el) => {
        // Evita re-splitear si ya está hecho
        if (el.__splitWordsApplied) return;

        // 2) Crea wrappers por palabra
        const outer = new SplitText(el, {
          type: "words",
          wordsClass: "wordWrapper overflow-hidden inline-block",
        });
        const inner = new SplitText(el, { type: "words" });
        el.__splitWordsApplied = true;
        el.__splitWordsOuter = outer;
        el.__splitWordsInner = inner;

        // Estado inicial
        gsap.set(inner.words, {
          yPercent: 100,
          opacity: 0,
          willChange: "transform,opacity",
        });

        // 3) Anima al entrar en viewport (una sola vez)
        gsap.to(inner.words, {
          yPercent: 0,
          opacity: 1,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });
      });
    });

    // 4) Limpieza: revierte el split y los estilos
    return () => {
      ctx.revert();
    };
  }, [selector, duration, ease, stagger, start]);
}
