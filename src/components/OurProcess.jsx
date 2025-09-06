// OurProcess.jsx
import React, { useState, useCallback, useMemo } from "react";
import Accordion from "./Accordion";
import Footer from "./Footer";
import PrimaryButton from "./buttons/PrimaryButton";
import items from "../data/accordion.json";

const OurProcess = () => {
  // Guardamos el índice abierto. Si ninguno: null.
  const [openIndex, setOpenIndex] = useState(null);
  const [isDark, setIsDark] = useState(null);

  // isDark = true cuando hay algo abierto

  // Si no hay abierto, mostramos el fondo del primer item (índice 0) como fallback
  const activeIndex = openIndex ?? 0;

  // Array de backgrounds desde el JSON o fallback por índice
  const backgrounds = useMemo(
    () => items.map((it, i) => it.image ?? `/assets/accordion/${i + 1}.webp`),
    []
  );

  // Recibe el índice actual desde el Accordion (number | null)
  const handleOpenChange = useCallback((idx) => {
    setOpenIndex(idx);
    setIsDark(idx !== null);
  }, []);

  return (
    <section
      id="our-process"
      className={`
        relative h-auto min-h-screen lg:h-auto w-full
        pl-8 lg:pl-16 pr-8 lg:pr-16 pt-32 flex flex-col gap-8 z-20
        transition-colors duration-500
      `}
    >
      {/* Fondo dinámico con blur + fade entre imágenes */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Pila de fondos: solo el activo con opacity-100, resto opacity-0 (fade) */}
        {backgrounds.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover
                        blur-xl scale-105
                        transition-opacity duration-700 ease-out
                        ${activeIndex === i ? "opacity-100" : "opacity-0"}`}
            // Nota: si prefieres más/menos blur: cambia blur-xl por blur-lg/blur-2xl
          />
        ))}

        {/* Capa de tintado para mantener legibilidad y tu esquema de colores */}
        <div
          className={`absolute inset-0 transition-colors duration-500
                      ${isDark ? "bg-secondary/70" : "bg-primary"}`}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col w-full gap-4 justify-start items-start 2xl-custom:absolute 2xl-custom:left-0 2xl-custom:top-32 2xl-custom:px-8 2xl:relative 2xl:inset-auto 2xl:px-0">
        <div className="flex w-full justify-between items-center">
          <h1
            className={`lg:text-5xl text-[2.1rem] lg:leading-normal leading-10 font-bold
                        transition-colors duration-500
                        ${isDark ? "text-primary" : "text-secondary"}`}
          >
            Our Process
          </h1>

          {/* Botón desktop */}
          <PrimaryButton
            href="/investor-hub"
            className={`hidden lg:block text-xl !py-3 !px-6 transition-colors duration-500
                        ${
                          isDark
                            ? "bg-primary text-secondary"
                            : "bg-secondary text-primary"
                        }`}
          >
            Investor Hub
          </PrimaryButton>
        </div>
      </div>

      {/* Accordion -> nos notifica el índice abierto */}
      <Accordion onOpenChange={handleOpenChange} isDark={isDark} />

      {/* Botón mobile */}
      <PrimaryButton
        href="/investor-hub"
        className={`mt-6 self-center lg:hidden transition-colors duration-500
                    ${
                      isDark
                        ? "bg-primary text-secondary"
                        : "bg-secondary text-primary"
                    }`}
      >
        Investor Hub
      </PrimaryButton>

      {/* Footer + gradiente inferior */}
      <div className="absolute lg:sticky bottom-0 left-0 w-full">
        <Footer
          className={`${
            isDark ? "text-primary" : "text-secondary"
          } lg:!px-0 transition-colors duration-500`}
        />
        <div
          className={`bottom-0 left-0 w-full h-[10vh] lg:h-[15vh] pointer-events-none bg-gradient-to-t to-transparent
                      transition-colors duration-500
                      ${isDark ? "from-secondary" : "from-primary"}`}
        />
      </div>
    </section>
  );
};

export default OurProcess;
