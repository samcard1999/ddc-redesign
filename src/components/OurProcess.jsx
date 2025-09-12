// OurProcess.jsx
import React, { useState, useCallback, useMemo } from "react";
import Accordion from "./Accordion";
import Footer from "./Footer";
import PrimaryButton from "./buttons/PrimaryButton";
import items from "../data/accordion.json";

const OurProcess = () => {
  // Índice abierto. Si ninguno: null.
  const [openIndex, setOpenIndex] = useState(null);

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
  }, []);

  return (
    <section
      id="our-process"
      className="
        relative h-auto min-h-screen lg:h-auto w-full
         pt-32 pb-20 lg:pb-0 flex flex-col gap-8 z-20
      "
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
          />
        ))}

        {/* Capa de tintado fija para legibilidad */}
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Header */}
      <div className="flex flex-col px-8 w-full gap-4 justify-start items-start 2xl-custom:absolute 2xl-custom:left-0 2xl-custom:top-32 2xl-custom:px-8 2xl:relative 2xl:inset-auto 2xl:px-0">
        <div className="flex w-full justify-between items-center px-8">
          <h1
            className="lg:text-5xl text-[2.1rem] lg:leading-normal leading-10 font-bold text-secondary hover:bg-secondary/50
          hover:text-secondary"
          >
            Our Process
          </h1>

          {/* Botón desktop */}
          <PrimaryButton
            href="/investor-hub"
            className="hidden lg:block text-xl !py-3 !px-6 bg-secondary text-primary hover:bg-secondary/50
          hover:!text-secondary"
          >
            Investor Hub
          </PrimaryButton>
        </div>
      </div>

      {/* Accordion -> nos notifica el índice abierto (sin props de color) */}
      <Accordion onOpenChange={handleOpenChange} />

      {/* Botón mobile */}
      <PrimaryButton
        href="/investor-hub"
        className="mt-6 self-center lg:hidden bg-secondary text-primary"
      >
        Investor Hub
      </PrimaryButton>

      {/* Footer + gradiente inferior */}
      <div className="absolute lg:sticky bottom-0 left-0 w-full">
        <Footer className="text-secondary px-8" />
        <div className="bottom-0 left-0 w-full h-[10vh] lg:h-[15vh] pointer-events-none bg-gradient-to-t from-primary to-transparent" />
      </div>
    </section>
  );
};

export default OurProcess;
