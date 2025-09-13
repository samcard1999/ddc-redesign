import React, { useEffect, useRef } from "react";
import { CountUp } from "countup.js";

const CountUpOnVisible = ({
  end,
  start = 0,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
}) => {
  const countRef = useRef(null);
  const hasAnimated = useRef(false); // Evitar que cuente más de una vez

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          const counter = new CountUp(el, end, {
            startVal: start,
            duration: duration,
            prefix: prefix,
            suffix: suffix,
            useEasing: true,
          });

          if (!counter.error) {
            counter.start();
            hasAnimated.current = true;
          } else {
            console.error(counter.error);
          }
        }
      },
      {
        threshold: 0.8, // Ajusta según cuándo quieras disparar la animación
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [end, start, duration]);

  return <span ref={countRef} className={className} />;
};

export default CountUpOnVisible;
