import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import team from "../data/team.json"; // [{ id, name, role, image, description, class }...]
import { useTranslation } from "react-i18next";

// Aparición de cada item al entrar al viewport
const itemReveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: "easeOut", delay: 0.04 * i },
  }),
};
const EASE_OUT = [0.22, 1, 0.36, 1];
// ⚠️ Panel SOLO altura (sin opacity) para no tapar las animaciones internas
const panelVariants = {
  initial: { height: 0 },
  open: {
    height: "auto",
    transition: { duration: 0.32, ease: EASE_OUT }, // ← sin spring
  },
  exit: {
    height: 0,
    transition: { duration: 0.22, ease: "easeInOut" }, // ← sin spring
  },
};

// Foto como en Team desktop (scale + y)
const photoVariants = {
  initial: { opacity: 0, scale: 1.03 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

// Texto/Descripción (fade + slide-up + blur)
const textVariants = {
  initial: { opacity: 0, scale: 1.01 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.99 },
};

export default function TeamAccordion({ items = team }) {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState(items?.[0]?.id);
  const reduce = false; // o usa useReducedMotion()
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="w-full max-w-xl pb-20 px-8 text-primary">
      {items.map((m, idx) => {
        const id = m.id ?? `member-${idx}`;
        const isOpen = id === openId;
        const name = m.name;
        const role = t(`team.team_members.${m.id}.role`);
        const image = m.image || m.photo; // compat
        const desc = t(`team.team_members.${m.id}.description`);

        return (
          <motion.div
            key={id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={itemReveal}
            custom={idx}
            className="relative will-change-[transform,opacity,height] transform-gpu"
          >
            {/* Cabecera */}
            <button
              type="button"
              onClick={() => toggle(id)}
              className="group relative w-full text-left py-3 pl-5 pr-3"
              aria-expanded={isOpen}
              aria-controls={`panel-${id}`}
            >
              <span
                className={`absolute left-0 top-2 bottom-2 w-[2px] rounded-full transition-opacity duration-300
                ${isOpen ? "opacity-100 bg-white/90" : "opacity-0 bg-white/0"}`}
              />
              <div>
                <h3
                  className={`text-xl leading-tight font-bold transition-opacity duration-300 ${
                    isOpen ? "opacity-100 " : "opacity-80"
                  }`}
                >
                  {name}
                </h3>
                <p
                  className={`text-sm text-primary/80 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {role}
                </p>
              </div>
            </button>

            {/* Contenido (imagen + descripción) */}
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  id={`panel-${id}`}
                  className="pl-5 pr-3 will-change-[height,opacity,transform] transform-gpu"
                  layout
                  initial="initial"
                  animate="open"
                  exit="exit"
                  variants={panelVariants}
                  style={{ overflow: "clip" }}
                >
                  <div className="mt-3 mb-4">
                    {/* Foto */}
                    <div className="relative w-2/3 max-w-xs aspect-square overflow-hidden rounded-md">
                      <img
                        key={`img-${id}`}
                        src={image}
                        alt={name}
                        width={512}
                        height={512}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover object-top ${
                          m.class || m.className || "object-top"
                        }`}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        variants={photoVariants}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.05,
                        }}
                        style={{ willChange: "transform, opacity" }}
                      />
                    </div>

                    {/* Descripción */}
                    {desc && (
                      <p
                        key={`desc-${id}`}
                        className="mt-3 text-xs leading-relaxed text-primary/90"
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        variants={textVariants}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.12,
                        }}
                        style={{ willChange: "transform, opacity" }}
                      >
                        {desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Separador */}
            <div className="mx-0 my-2 h-px bg-white/10" />
          </motion.div>
        );
      })}
    </div>
  );
}
