import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import AnimatedBackground from "../Background/AnimatedBackground";
import Footer from "../Footer";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Header";
import projects from "../../data/villas.json"; // [{ id, title, image, year, location }...]
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// Variantes framer-motion
const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, when: "beforeChildren" } },
};
const cardV = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

export default function ProjectsInside() {
  const [query, setQuery] = useState("");
  const [matchMode, setMatchMode] = useState("contains"); // "contains" | "exact"
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [location, setLocation] = useState("All");
  const navigate = useNavigate();
  const handleProjectClick = (projectId) => {
    window.location.href = `/projects/${projectId}`;
  };
  // ===== Scroll al top absoluto cuando cambien filtros/vista/búsqueda =====
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [view, location, matchMode, query]);

  const firstMountRef = useRef(true);
  useEffect(() => {
    firstMountRef.current = false;
  }, []);

  // Normaliza: inyecta location si falta
  const normalized = useMemo(
    () =>
      projects.map((p) => ({
        ...p,
        location: p.city,
      })),
    []
  );

  // Filtro por nombre + ubicación
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return normalized.filter((p) => {
      const title = p.name.toLowerCase();
      const nameOk =
        q.length === 0
          ? true
          : matchMode === "exact"
          ? title === q
          : title.includes(q);
      const locOk = location === "All" ? true : p.location === location;
      return nameOk && locOk;
    });
  }, [normalized, query, matchMode, location]);

  const [isLg, setIsLg] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => setIsLg(e.matches);
    setIsLg(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <Helmet>
        <title>DDC Developments | Projects</title>
      </Helmet>
      <section
        id="our-projects"
        className="relative z-20 min-h-screen w-full bg-primary "
      >
        <div className="absolute inset-0 -z-10 bg-black opacity-80" />
        <AnimatedBackground />
        <Header className={"is-clear"} />
        {/* Controles */}
        <div className="bg-primary pb-12 sticky top-0 z-20 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
          <div className="absolute inset-0 -z-10 bg-black opacity-80" />
          <div className="px-8 pt-24 mb-6 ">
            <div className="flex lg:flex-row flex-col w-full lg:justify-between  lg:items-center ">
              <h1 className="text-4xl font-bold text-primary mb-4">
                Our Projects
              </h1>

              {/* Search */}
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects…"
                  className="w-full lg:w-[20vw] rounded-full border border-white/20 bg-white/5 text-primary placeholder:text-white/50 px-5 py-3 pr-12 outline-none focus:border-white/40"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-3.5-3.5" />
                </svg>
              </div>
            </div>

            {/* Row: toggle + location + match mode */}
            <div className="mt-4 mb-8 flex flex-row items-center justify-between relative">
              <span className="absolute -bottom-8 lg:-bottom-16 left-2 lg:left-2 -translate-x-1/2  text-primary opacity-40 text-2xl ">
                +
              </span>
              <span className="absolute -bottom-8 lg:-bottom-16 right-2 lg:right-2 translate-x-1/2  text-primary opacity-40 text-2xl ">
                +
              </span>

              {/* Toggle List/Grid */}
              <div className="flex items-center gap-2 text-white">
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={` py-1 rounded-lg text-sm font-semibold transition-colors ${
                    view === "list"
                      ? " text-primary"
                      : " text-grey/50 hover:bg-white/20"
                  }`}
                >
                  List
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={` py-1 rounded-lg text-sm font-semibold transition-colors ${
                    view === "grid"
                      ? " text-primary"
                      : " text-grey/50 hover:bg-white/20"
                  }`}
                >
                  Grid
                </button>
              </div>

              {/* Location select */}
              <div className="flex items-center justify-between relative">
                <select
                  className="bg-transparent border relative border-white/20 text-primary rounded-full w-fit pl-2 pr-5 py-3 text-sm text-dark_blue"
                  onChange={(e) => setLocation(e.target.value)}
                  defaultValue="" // para forzar selección inicial vacía
                >
                  <option value="" disabled className="!text-slate-400">
                    Location
                  </option>
                  <option value="Punta Gorda">Punta Gorda</option>
                  <option value="Miami">Miami</option>
                  <option value="Lehigh Acres">Lehigh</option>
                  <option value="All">All</option>
                </select>
                <svg
                  className="lg:hidden pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Render: GRID o LIST */}
        <div className="px-8 pb-32 min-h-screen">
          {view === "grid" ? (
            <motion.div
              key="grid"
              variants={containerV}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p, index) => {
                  // En lg son 3 columnas. Es borde derecho si (index+1) % 3 === 0
                  // Además, si la última fila está incompleta, el último item también es borde derecho.
                  const isRightEdgeLg =
                    isLg &&
                    ((index + 1) % 3 === 0 || index === filtered.length - 1);

                  return (
                    <motion.button
                      onClick={() => handleProjectClick(p.folder)}
                      layout
                      key={p.id}
                      variants={cardV}
                      initial={firstMountRef.current ? false : "hidden"}
                      whileInView="visible"
                      exit="exit"
                      viewport={{ amount: 0.35, margin: "0px 0px -10% 0px" }}
                      className="group aspect-video p-3 relative"
                    >
                      {/* ← Añadimos no-sign dinámicamente SOLO en lg cuando es borde derecho */}
                      <span
                        className={`${
                          isLg && "hidden"
                        } left-span absolute -bottom-4 lg:-bottom-4 left-0 lg:-left-5 -translate-x-1/2 text-primary opacity-40 text-2xl `}
                      >
                        +
                      </span>

                      <span
                        className={`right-span absolute -bottom-4 lg:-bottom-4 right-0 lg:-right-5 translate-x-1/2 text-primary opacity-40 text-2xl ${
                          isRightEdgeLg ? "no-sign" : ""
                        }`}
                      >
                        +
                      </span>

                      <div className="overflow-hidden shadow-[0_18px_35px_-10px_rgba(0,0,0,.45)]">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="h-[180px] sm:h-[200px] md:h-[220px] lg:aspect-video lg:h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between border-b border-primary text-primary">
                        <span className="font-semibold">{p.name}</span>
                        <span className="text-sm opacity-80">2025</span>
                      </div>
                      <h3 className="mt-1 text-xs w-fit absolute right-0 pr-3 text-white/60">
                        {p.location}
                      </h3>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              layout
              variants={containerV}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <motion.button
                    onClick={() => handleProjectClick(p.folder)}
                    layout
                    key={p.id}
                    variants={cardV}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ amount: 0.4, margin: "-10% 0px -10% 0px" }}
                    className="group grid grid-cols-1 gap-4 items-center "
                  >
                    <div className="flex w-full pb-2 justify-between">
                      <span className="font-bold text-lg text-primary transition-colors duration-300">
                        {p.name}
                      </span>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-sm text-primary transition-opacity duration-300 ">
                          {p.location}
                        </span>
                        <span className="text-sm text-primary transition-opacity duration-300">
                          2025
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {filtered.length === 0 && (
            <p className="text-white/70 mt-6">No projects found.</p>
          )}
        </div>

        {/* Footer */}
        <div className="sticky inset-x-0 bottom-0 mix-blend-difference">
          <Footer className={""} />
        </div>
      </section>
    </>
  );
}
