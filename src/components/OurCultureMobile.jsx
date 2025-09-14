import React, { useEffect, useRef, useState } from "react";
import ourCulture from "../data/ourCulture.json";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";

export default function OurCultureMobile({
  videoSrc = "/assets/video/our-culture.mp4",
  items = ourCulture,
  className = "",
}) {
  const videoRef = useRef(null);
  const [videoDur, setVideoDur] = useState(16); // fallback si el video aún no cargó

  const { t } = useTranslation();

  // Asegura autoplay del video en móvil/safari y toma su duración
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      const d = Number.isFinite(v.duration) ? v.duration : 16;
      setVideoDur(d > 0 ? d : 16);
    };
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.autoplay = true;
    v.play().catch(() => {});
    v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  // Reparte el tiempo del video entre N slides
  const N = Math.max(1, items.length);
  const delayMs = Math.max(800, Math.round((videoDur * 1000) / N));
  // Forzamos re-init de Swiper cuando cambie el delay
  const swiperKey = `${N}-${delayMs}`;

  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
      aria-label="Culture with video background and auto comments"
    >
      {/* Video de fondo */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Degradado inferior para legibilidad */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 md:h-64 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Overlay de textos (Swiper vertical) */}
      <h2 className="text-3xl font-bold text-primary absolute left-8 bottom-52 mix-blend-difference">
        {t("culture.title")}
      </h2>
      <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-8 md:pb-12">
        <div className="relative h-40  overflow-hidden [mask-image:linear-gradient(to_top,black,black,transparent)]">
          <Swiper
            key={swiperKey}
            modules={[Autoplay]}
            direction="vertical"
            slidesPerView={3}
            loop
            speed={450} // duración de la transición
            autoplay={{
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            allowTouchMove={true} // si no quieres swipe manual: pon false
            className="w-full h-full"
          >
            {items.map((it, i) => (
              <SwiperSlide key={i} className="!flex !items-start">
                <div className="text-white/95 space-y-1">
                  <p className="text-base md:text-lg font-bold leading-tight">
                    {t(`culture.features.${i}.title`)}
                  </p>

                  <p className="text-xs md:text-sm text-white/75 leading-snug">
                    {t(`culture.features.${i}.description`)}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
