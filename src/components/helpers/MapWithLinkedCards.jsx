// MapWithLinkedCards.jsx
import React from "react";
import { InvestmentCard } from "./InvestmentCard"; // tu tarjeta
import cardsJson from "../../data/investments.json";

function MapWithLinkedCards({
  mapUrl = "assets/investments/investment_map.png", // tu PNG
  cards = [], // [{title, asset_type, construction_term, investor_profile}, ...]
}) {
  // Dimensiones del SVG (se escalan por viewBox)
  const VB = { w: 1200, h: 700 };

  // Dónde se dibuja el mapa dentro del SVG (deja margen para las tarjetas)
  const MAP = { x: 350, y: 60, w: 500, h: 580 }; // ajusta a tu gusto

  // Helpers: convertir % (del mapa) a coords absolutas del SVG
  const pt = (xPct, yPct) => ({
    x: MAP.x + (MAP.w * xPct) / 100,
    y: MAP.y + (MAP.h * yPct) / 100,
  });

  // Tus anclajes (porcentaje relativo al mapa)
  const anchors = {
    pg: pt(61, 61), // Punta Gorda
    miami1: pt(80.5, 79), // Miami (tarjeta derecha 1)
    miami2: pt(80.5, 69), // Miami (tarjeta derecha 2)
  };

  // Posiciones fijas de las tarjetas (dentro del SVG)
  // tip: ajusta X/Y para alinear con tu diseño
  const cardPos = {
    left1: { x: 70, y: 140 },
    left2: { x: 70, y: 360 },
    right1: { x: 910, y: 120 },
    right2: { x: 910, y: 360 },
  };

  // De dónde salen las líneas en cada tarjeta (un punto en su borde interior)
  // Tamaño "visual" de la tarjeta (aprox) para ubicar mejor el punto de conexión
  const CARD_SIZE = { w: 400, h: 400 }; // ~16rem x ~13.75rem (ajusta a tu InvestmentCard)
  const tap = {
    left: ({ x, y }) => ({ x: x + CARD_SIZE.w, y: y + CARD_SIZE.h / 2 }),
    right: ({ x, y }) => ({ x: x, y: y + CARD_SIZE.h / 2 }),
  };

  // Definición de líneas suaves (curvas)
  const curve = (a, b, bend = 0.25) => {
    const dx = b.x - a.x;
    const c1 = { x: a.x + dx * bend, y: a.y };
    const c2 = { x: b.x - dx * bend, y: b.y };
    return `M ${a.x},${a.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${b.x},${b.y}`;
  };

  // Emparejar tarjetas ↔ anclajes (según tu pedido)
  const pairs = [
    { cardKey: "left1", anchorKey: "pg", cardIndex: 0 },
    { cardKey: "left2", anchorKey: "pg", cardIndex: 1 },
    { cardKey: "right1", anchorKey: "miami1", cardIndex: 2 },
    { cardKey: "right2", anchorKey: "miami2", cardIndex: 3 },
  ];

  return (
    <div className="w-full h-[80vh]">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="w-full h-full"
        role="img"
        aria-label="Mapa con tarjetas enlazadas"
      >
        {/* Mapa como imagen dentro del SVG */}
        <image
          href={mapUrl}
          x={MAP.x}
          y={MAP.y}
          width={MAP.w}
          height={MAP.h}
          preserveAspectRatio="xMidYMid meet"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
        />

        {/* Definición de marcador de flecha (opcional) */}
        <defs>
          <marker id="dot" markerWidth="6" markerHeight="6" refX="3" refY="3">
            <circle cx="3" cy="3" r="3" fill="currentColor" />
          </marker>
        </defs>

        {/* Líneas */}
        {pairs.map(({ cardKey, anchorKey }, i) => {
          const cardP = cardPos[cardKey];
          const anchor = anchors[anchorKey];
          if (!cardP || !anchor) return null;
          const start = cardKey.startsWith("left")
            ? tap.left(cardP)
            : tap.right(cardP);
          const d = curve(start, anchor, 0.25);
          return (
            <path
              key={`edge-${i}`}
              d={d}
              fill="none"
              stroke="rgba(203,213,225,1)" // slate-300
              strokeWidth="2"
              markerEnd="url(#dot)"
            />
          );
        })}

        {/* Tarjetas como foreignObject (HTML renderizado dentro del SVG) */}
        {pairs.map(({ cardKey, cardIndex }, i) => {
          const cardP = cardPos[cardKey];
          const data = cards[cardIndex];
          if (!cardP || !data) return null;
          return (
            <foreignObject
              key={`card-${i}`}
              x={cardP.x}
              y={cardP.y}
              width={CARD_SIZE.w}
              height={CARD_SIZE.h}
              requiredExtensions="http://www.w3.org/1999/xhtml"
            >
              <div className="h-full w-full">
                <InvestmentCard
                  {...data}
                  onAction={() => console.log("CTA", data?.title)}
                  className={
                    cardKey.startsWith("left") ? "rounded-2xl" : "rounded-2xl"
                  }
                />
              </div>
            </foreignObject>
          );
        })}

        {/* (Opcional) Marcar visualmente los anclajes en el mapa */}
        {Object.entries(anchors).map(([k, p]) => (
          <circle key={k} cx={p.x} cy={p.y} r="4" fill="white" opacity="0.7" />
        ))}
      </svg>
    </div>
  );
}

export default function Investmentss() {
  return (
    <MapWithLinkedCards
      mapUrl="/assets/investments/investment_map.png"
      cards={cardsJson}
    />
  );
}
