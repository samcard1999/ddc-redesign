// Accordion.js
import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // puedes usar heroicons o tu propio svg

const items = [
  {
    number: "1",
    title: "Market analysis",
    content: "Contenido del análisis de mercado.",
  },
  {
    number: "2",
    title: "Financing & loan management",
    content: "Detalles sobre financiamiento.",
  },
  {
    number: "3",
    title: "Architectural project",
    content: "Descripción del proyecto arquitectónico.",
  },
  {
    number: "4",
    title: "Modular construction (3-4 months)",
    content: "Proceso de construcción modular.",
  },
  {
    number: "5",
    title: "Pre-sale & exclusive sales",
    content: "Información sobre preventa y ventas exclusivas.",
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full text-secondary">
      {items.map((item, index) => (
        <div
          key={index}
          className={`border-b border-gray-400 relative ${
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
                className={`font-bold text-4xl transition-opacity duration-300 ${
                  openIndex === index ? "opacity-100" : "opacity-30"
                }`}
              >
                {item.number}
              </span>
              <span className="text-base font-bold">{item.title}</span>
              <div className="bg-gray-400 h-full w-px py-2" />
            </div>
            <img
              className={`w-5 h-5 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              src="assets/svg/accordion_arrow.svg"
              alt="accordion_arrow.svg"
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 text-sm text-secondary opacity-85">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
