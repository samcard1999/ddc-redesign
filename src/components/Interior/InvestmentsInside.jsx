import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import AnimatedBackground from "../Background/AnimatedBackground";
import Header from "../Header";
import Cards from "../../data/investments.json";
import Footer from "../Footer";

/* -------------------- CARD -------------------- */
export function InvestmentCard({
  title,
  asset_type,
  construction_term,
  investor_profile,
  onAction,
  className = "",
}) {
  return (
    <article
      className={`relative w-[16rem] min-h-fit p-4
      bg-primary
      ring-1 ring-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)]
      text-secondary ${className}`}
    >
      <div className="flex flex-col justify-between h-full">
        <h3 className="font-semibold text-lg border-b border-secondary">
          {title}
        </h3>

        {/* corregido: text-text-lg -> text-base */}
        <div className="mt-3 space-y-3 text-base leading-5">
          <div>
            <p className="uppercase tracking-wide text-secondary font-semibold text-sm">
              Tipo de activo
            </p>
            <p className="text-secondary text-xs">{asset_type}</p>
          </div>
          <div>
            <p className="uppercase tracking-wide text-secondary font-semibold text-sm">
              Plazo de obra
            </p>
            <p className="text-secondary text-xs">{construction_term}</p>
          </div>
          <div>
            <p className="uppercase tracking-wide text-secondary font-semibold text-sm">
              Perfil de inversor
            </p>
            <p className="text-secondary text-xs">{investor_profile}</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <button
            type="button"
            onClick={onAction}
            className="mt-4 inline-flex items-center justify-center w-[170px]
              rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200
              bg-[#1E1F20] hover:bg-secondary/20 hover:text-secondary active:bg-secondary/25 active:text-secondary
              shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
              ring-1 ring-white/20 text-primary"
          >
            Talk to an advisor
          </button>
        </div>
      </div>

      <span className="absolute left-0 top-8 h-4 w-[2px] bg-white/25 rounded-r-sm" />
    </article>
  );
}

/* -------------------- INVESTMENTS INSIDE (estático con SVG overlay) -------------------- */
const pctToPx = (pct, size) => (pct / 100) * size;

// Corrige object-fit:contain -> calcula el rectángulo real del contenido
function getObjectFitContentRect(imgEl) {
  const box = imgEl.getBoundingClientRect();
  const iw = imgEl.naturalWidth || box.width;
  const ih = imgEl.naturalHeight || box.height;
  if (!iw || !ih) return box;
  const scale = Math.min(box.width / iw, box.height / ih);
  const w = iw * scale;
  const h = ih * scale;
  const left = box.left + (box.width - w) / 2;
  const top = box.top + (box.height - h) / 2;
  return { left, top, width: w, height: h };
}

// Mapeo por índice de tarjeta -> lado y coordenadas (% del mapa)
function anchorByIndex(idx) {
  if (idx === 0) return { side: "left", xPct: 61, yPct: 61 }; // izquierda 1
  if (idx === 1) return { side: "left", xPct: 61, yPct: 61 }; // izquierda 2 (mismo punto)
  if (idx === 2) return { side: "right", xPct: 80.5, yPct: 79 }; // derecha 1
  if (idx === 3) return { side: "right", xPct: 80.5, yPct: 69 }; // derecha 2
  // fallback
  return { side: idx % 2 ? "right" : "left", xPct: 50, yPct: 60 };
}

const InvestmentsInside = () => {
  const stageRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const cardRefs = useMemo(() => new Map(), []);

  const [lines, setLines] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // Prepara items con su anclaje por índice
  const items = useMemo(
    () =>
      (Cards || []).map((c, idx) => ({
        ...c,
        id: `card-${idx}`,
        ...anchorByIndex(idx),
      })),
    []
  );

  const leftItems = items.filter((i) => i.side === "left");
  const rightItems = items.filter((i) => i.side === "right");

  const measure = () => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img) return;

    const stageRect = stage.getBoundingClientRect();
    const contentRect = getObjectFitContentRect(img); // rectángulo real del mapa renderizado

    const next = [];
    items.forEach((it) => {
      const cardEl = cardRefs.get(it.id);
      if (!cardEl) return;
      const cardRect = cardEl.getBoundingClientRect();

      // Punto en el mapa (usar contenido real del PNG dentro del <img>)
      const pinX = contentRect.left + pctToPx(it.xPct, contentRect.width);
      const pinY = contentRect.top + pctToPx(it.yPct, contentRect.height);

      // Punto de anclaje en el borde de la tarjeta
      const insetY = 12; // margen para no pegar a las esquinas
      const targetY = Math.min(
        Math.max(pinY, cardRect.top + insetY),
        cardRect.bottom - insetY
      );
      const targetX = it.side === "left" ? cardRect.right : cardRect.left;

      // Convertir a coords del SVG overlay (stage)
      const from = { x: pinX - stageRect.left, y: pinY - stageRect.top };
      const to = { x: targetX - stageRect.left, y: targetY - stageRect.top };

      next.push({ id: it.id, from, to });
    });

    setLines(next);
  };

  useLayoutEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    if (imgWrapRef.current) ro.observe(imgWrapRef.current);
    if (imgRef.current) ro.observe(imgRef.current);

    // observar cada tarjeta
    cardRefs.forEach((el) => el && ro.observe(el));

    // cambios de ventana/scroll/orientación
    const onScroll = () => measure();
    const onResize = () => measure();
    const onOrient = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onOrient);

    // cuando cargan las fuentes (evita saltos de layout)
    if (document?.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrient);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const vbW = stageRef.current?.clientWidth || 1200;
  const vbH = stageRef.current?.clientHeight || 700;

  return (
    <section className="min-h-screen w-full min-w-[70vw] relative z-20 pt-24 bg-primary">
      <div className="absolute inset-0 -z-10 bg-black/80" />
      <AnimatedBackground />
      <Header className={"is-clear"} />

      <div
        ref={stageRef}
        className="relative isolate w-full mx-auto h-full max-w-[90%] py-10"
      >
        {/* SVG de líneas (debajo de las tarjetas) */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full z-10"
          viewBox={`0 0 ${vbW} ${vbH}`}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9aa4b2" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {lines.map((ln) => {
            const active = activeId === ln.id;
            return (
              <g key={ln.id} filter="url(#glow)">
                <line
                  x1={ln.from.x}
                  y1={ln.from.y}
                  x2={ln.to.x}
                  y2={ln.to.y}
                  stroke={active ? "#ffffff" : "url(#lineGrad)"}
                  strokeOpacity={active ? 0.95 : 0.6}
                  strokeWidth={active ? 3.5 : 2}
                />
                <circle
                  cx={ln.from.x}
                  cy={ln.from.y}
                  r={active ? 5 : 4}
                  fill="#7dd3fc"
                  opacity={active ? 1 : 0.9}
                />
                <circle
                  cx={ln.to.x}
                  cy={ln.to.y}
                  r={active ? 4 : 3}
                  fill="#ffffff"
                  opacity={0.85}
                />
              </g>
            );
          })}
        </svg>

        {/* TARJETAS IZQUIERDA */}
        <div className="absolute z-20 left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6">
          {leftItems.map((card) => (
            <div
              key={card.id}
              className="relative z-20"
              ref={(el) => cardRefs.set(card.id, el)}
              onMouseEnter={() => setActiveId(card.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <InvestmentCard
                title={card.title}
                asset_type={card.asset_type}
                construction_term={card.construction_term}
                investor_profile={card.investor_profile}
              />
            </div>
          ))}
        </div>

        {/* MAPA: envoltorio + imagen con object-contain */}
        <div
          ref={imgWrapRef}
          className="relative z-0 mx-auto w-[780px] max-w-[74%] max-h-[70vh]"
        >
          <img
            ref={imgRef}
            src="assets/investments/investment_map1.png"
            alt="investment map"
            className="block w-full h-auto object-contain pointer-events-none opacity-95"
            onLoad={measure}
          />
        </div>

        {/* TARJETAS DERECHA */}
        <div className="absolute z-20 right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6">
          {rightItems.map((card) => (
            <div
              key={card.id}
              className="relative z-20"
              ref={(el) => cardRefs.set(card.id, el)}
              onMouseEnter={() => setActiveId(card.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <InvestmentCard
                title={card.title}
                asset_type={card.asset_type}
                construction_term={card.construction_term}
                investor_profile={card.investor_profile}
                className="text-right"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer + gradiente inferior */}
      <div className="absolute lg:sticky bottom-0 left-0 w-full">
        <Footer className="text-primary px-8" />
        <div className="bottom-0 left-0 w-full h-[10vh] lg:h-[15vh] pointer-events-none bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
};

export default InvestmentsInside;
