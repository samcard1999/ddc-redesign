// Accordion.jsx
import React, { useState, useEffect, useLayoutEffect } from "react";
import items from "../data/accordion.json";

const Accordion = ({ onOpenChange, isDark }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
  };

  useLayoutEffect(() => {
    onOpenChange?.(openIndex);
  }, [openIndex, onOpenChange]);
  return (
    <div
      className={`w-full h-full transition-colors duration-500 px-8 lg:px-16 ${
        isDark ? "text-primary" : "text-secondary"
      }`}
    >
      {items.map((item, index) => {
        const opened = openIndex === index;
        return (
          <div
            key={index}
            className={`border-b relative transition-colors duration-500 ${
              isDark ? "border-primary/30" : "border-gray-400"
            } ${
              index === items.length - 1
                ? "after:content-['+'] after:absolute after:-left-4 lg:after:-left-8 after:bottom-0 after:translate-y-1/2 after:text-lg after:opacity-60"
                : ""
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="group relative flex items-center justify-between w-full h-[10vh] lg:h-[14vh] py-4
                         before:content-['+'] before:absolute before:-left-4 lg:before:-left-8 before:top-0 before:-translate-y-1/2 before:text-lg before:opacity-60"
            >
              <div className="flex items-center justify-between h-full w-[75vw] lg:w-[20vw]">
                <span
                  className={`font-bold text-4xl transition-all duration-300 ${
                    opened ? "opacity-100" : "opacity-30"
                  }`}
                >
                  {item.number}
                </span>
                <span className="text-base font-bold">{item.title}</span>
                <div
                  className={`h-full w-px py-2 transition-colors duration-300 ${
                    isDark ? "bg-primary/30" : "bg-gray-400"
                  }`}
                />
              </div>

              <svg
                id="Capa_2"
                data-name="Capa 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50.79 50.79"
                className={`w-5 h-5 transition-transform duration-300 stroke-current  ${
                  opened ? "rotate-180" : ""
                }`}
              >
                <g id="Capa_1-2" data-name="Capa 1">
                  <g>
                    <circle
                      cx="25.39"
                      cy="25.39"
                      r="24.89"
                      style={{
                        fill: "none",
                        strokeMiterlimit: 10,
                      }}
                    />
                    <g>
                      <line
                        x1="25.39"
                        y1="9.37"
                        x2="25.39"
                        y2="39.88"
                        style={{
                          fill: "none",
                          strokeMiterlimit: 10,
                        }}
                      />
                      <polyline
                        points="38.12 27.47 25.39 40.19 12.67 27.47"
                        style={{
                          fill: "none",
                          strokeMiterlimit: 10,
                        }}
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </button>

            <div
              className={`flex lg:flex-row flex-col gap-4 lg:gap-16 items-start overflow-hidden transition-all duration-500 ${
                opened ? "max-h-fit opacity-100 mb-8" : "max-h-0 opacity-0"
              }`}
            >
              <img
                className="lg:h-80 lg:ml-[20vw] object-cover h-full w-[75vw] lg:w-auto"
                src={item.image}
                alt={`${item.alt}`}
                loading="lazy"
              />

              <div
                className={`lg:px-4 lg:py-0 lg:pr-0 py-4 pr-4 text-sm transition-colors duration-500 ${
                  isDark ? "text-primary/85" : "text-secondary/85"
                }`}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
