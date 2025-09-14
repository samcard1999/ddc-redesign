import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "./Background/AnimatedBackground";
import Footer from "./Footer";
import members from "../data/team.json";
import culture from "../data/ourCulture.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";

// helpers: calcular offset final dinámico
function getRect(el) {
  return el?.getBoundingClientRect?.() || { top: 0, bottom: 0, height: 0 };
}
function updateTailOffset(swiper) {
  if (!swiper || !swiper.el || !swiper.slides || !swiper.slides.length) return;
  const container = getRect(swiper.el);
  const lastSlideEl = swiper.slides[swiper.slides.length - 1];
  const last = getRect(lastSlideEl);
  const offsetAfter = Math.max(0, Math.round(container.height - last.height));
  swiper.params.slidesOffsetAfter = offsetAfter;
  swiper.update();
}

// --- NUEVO: variants para animar cada slide con delay por índice ---
const itemVariant = {
  initial: { opacity: 0, y: 8, filter: "blur(2px)" },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: "easeOut", delay: i * 0.06 },
  }),
};

const containerVariant = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: "easeInOut" } },
};

export default function TeamSection({}) {
  const { t } = useTranslation();
  // Modo solo para animar el título y disparar la animación secuencial de slides
  const [mode, setMode] = useState("team"); // "team" | "culture"
  const [activeId, setActiveId] = useState(members?.[0]?.id);
  const active = useMemo(
    () => members.find((m) => m.id === activeId) || members[0],
    [members, activeId]
  );

  const swiperRef = useRef(null);

  const goNext = () => {
    const s = swiperRef.current;
    if (!s) return;
    const next = Math.min(s.activeIndex + 1, s.slides.length - 1);
    s.slideTo(next, 500);
  };

  const isTeam = mode === "team";
  const list = isTeam ? members : culture;
  const TRANS = { duration: 0.45, ease: "easeOut" };

  return (
    <section className="relative w-full h-screen z-20 bg-primary text-primary px-8">
      <div className="absolute inset-0 -z-10 opacity-80 bg-black" />
      <AnimatedBackground />

      {/* --- TÍTULO con transición (solo cambia el texto) --- */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={mode}
          className="absolute top-32 left-8 text-3xl lg:text-5xl font-bold"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {isTeam ? t("team.title") : t("culture.title")}
        </motion.h2>
      </AnimatePresence>

      {/* Botón que alterna el modo (por ahora solo título y anima las slides) */}
      <button
        className="z-50 bg-primary text-secondary text-lg absolute top-32  
        border border-primary rounded-full font-bold tracking-wide 
        hover:bg-white/10 transition-all duration-300 w-fit h-fit
        !px-10 !py-3 left-1/2 -translate-x-1/2 hover:text-primary"
        onClick={() => setMode((m) => (m === "team" ? "culture" : "team"))}
      >
        {isTeam ? t("team.button_culture") : t("team.button_team")}
      </button>

      {/* IZQUIERDA: Swiper vertical */}
      <div
        className={`absolute h-full ${
          isTeam ? "w-3/4" : "w-full"
        } left-0 overflow-hidden`}
      >
        <div
          className={`absolute top-56 bottom-20 left-8 ${
            isTeam
              ? "opacity-100 pointer-events-auto data-lenis-prevent"
              : "opacity-0 pointer-events-none"
          } `}
          data-lenis-prevent
        >
          <Swiper
            direction="vertical"
            slidesPerView="auto"
            mousewheel={{ forceToAxis: true }}
            keyboard={{ enabled: true }}
            speed={500}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            onInit={(s) => {
              updateTailOffset(s);
              s.slideTo(s.activeIndex, 0);
            }}
            onResize={(s) => {
              updateTailOffset(s);
              s.slideTo(s.activeIndex, 0);
            }}
            onActiveIndexChange={(s) => {
              const m = members[s.activeIndex];
              if (m?.id) setActiveId(m.id);
              s.slideTo(s.activeIndex, 0);
            }}
            className="h-full z-50"
            modules={[Mousewheel, Keyboard]}
          >
            {list.map((m, idx) => (
              <SwiperSlide key={`${m.id}-${idx}`} className="!h-auto">
                {({ isActive }) => (
                  // --- CAMBIO: motion.button para animar cada fila de slide ---
                  <motion.button
                    type="button"
                    onClick={() => {
                      const s = swiperRef.current;
                      s?.slideTo(idx, 400);
                      s?.slideTo(idx, 0);
                    }}
                    className="group relative w-full py-2 pr-4 text-left"
                    aria-current={isActive ? "true" : "false"}
                    // re-dispara animación cuando cambia el modo (clave distinta)
                    key={`${m.id}-${idx}-${mode}`}
                    variants={itemVariant}
                    initial="initial"
                    animate="animate"
                    custom={idx}
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px] rounded-full transition-opacity duration-300
                        ${
                          isActive
                            ? "opacity-100 bg-white/90"
                            : "opacity-0 bg-white/0"
                        }`}
                    />
                    <div className="pl-4 ">
                      <h3
                        className={`text-base lg:text-lg transition-opacity duration-300
                          ${isActive ? "opacity-100 font-bold" : "opacity-80"}`}
                      >
                        {m.name}
                      </h3>
                      <p
                        className={`text-xs lg:text-sm text-primary/80 transition-opacity duration-300
                          ${isActive ? "opacity-100" : "opacity-80"}`}
                      >
                        {t(`team.team_members.${active.id}.role`)}
                      </p>
                    </div>
                  </motion.button>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {!isTeam && (
          <motion.div
            key="our-culture" // re-monta al switchear
            className="absolute top-48 bottom-20 left-8 w-full h-full select-none pointer-events-none"
            variants={containerVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ul className="space-y-2">
              {culture.map((feat, idx) => (
                <motion.li
                  key={`${feat.title}-${idx}`}
                  className="relative w-full py-2 pr-4 text-left"
                  variants={itemVariant}
                  initial="initial"
                  animate="animate"
                  custom={idx} // delay por índice (arriba → abajo)
                >
                  {/* Línea visible como si estuviera “activa” */}
                  <div className="pl-4">
                    <h3 className="text-base lg:text-lg font-bold text-primary opacity-100">
                      {t(`culture.features.${idx + 1}.title`)}
                    </h3>
                    <p className="text-xs lg:text-sm text-primary/80 opacity-100">
                      {t(`culture.features.${idx + 1}.description`)}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        {/* Fade inferior para desborde */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[18%] bg-gradient-to-t from-black/30 from-50% to-transparent" />
      </div>

      {/* Flecha abajo */}
      <button
        onClick={goNext}
        className={`${
          isTeam
            ? "pointer-events-auto opacity-100"
            : "opacity-0 pointer-events-none"
        } absolute bottom-24 left-1/2 -translate-x-1/2 z-10 
                       w-10 h-10 hover:text-white/50 transition`}
        aria-label="Next"
        title="Next"
      >
        <svg
          viewBox="0 0 50.79 50.79"
          className="w-6 h-6 transition duration-300 stroke-current"
        >
          <g>
            <circle cx="25.39" cy="25.39" r="24.89" fill="none" />
            <g>
              <line x1="25.39" y1="9.37" x2="25.39" y2="39.88" />
              <polyline
                points="38.12 27.47 25.39 40.19 12.67 27.47"
                fill="none"
              />
            </g>
          </g>
        </svg>
      </button>

      {/* Panel derecho fijo (sin cambios) */}

      <div
        className={`absolute h-full w-1/4 top-0 right-0  shadow-[inset_5px_0_45px_rgba(0,0,0,0.5)]`}
      >
        {/* Contenedor de capas con overflow-hidden para el slide en X */}
        <div className="relative h-full w-full  overflow-hidden ">
          {/* ===== Capa TEAM: foto + textos (base) ===== */}
          <AnimatePresence mode="wait">
            {isTeam && (
              <motion.div
                className="w-full h-full flex flex-col gap-8 px-12 pt-20 pb-10 "
                initial={{ x: "0%", opacity: 1 }}
                animate={{ x: "0", opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={TRANS}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="flex flex-col gap-4">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active.image}
                      className={`${
                        active.class || ""
                      } w-full aspect-square object-cover object-top `}
                      src={active.image}
                      alt={active.name}
                      loading="lazy"
                      initial={{ opacity: 0, scale: 1.03, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={active.id + "-name"}
                      className="text-lg leading-5 font-bold"
                      initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {active.name}
                      <br />
                      <span className="text-primary/70 text-sm">
                        {t(`team.team_members.${active.id}.role`)}
                      </span>
                    </motion.h2>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id + "-bio"}
                    className="text-xs text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {t(`team.team_members.${active.id}.description`)}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          {/* ===== Capa CULTURE: video vertical (overlay) ===== */}
          <AnimatePresence mode="wait">
            {!isTeam && (
              <motion.div
                key="culture-video"
                className="absolute inset-0 z-10 h-full flex items-start justify-center"
                // Video oculto a la IZQUIERDA y entra a 0; sale de nuevo a la izquierda
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={TRANS}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Video vertical que se adapta al ancho con object-cover */}
                <div className="relative w-full aspect-[9/16] h-full overflow-hidden">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/assets/video/our-culture.mp4" // ajusta la ruta si es necesario
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="pointer-events-none absolute inset-0 "></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer className="text-primary" />
    </section>
  );
}
