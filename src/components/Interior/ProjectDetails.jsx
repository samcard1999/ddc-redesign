import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import AnimatedBackground from "../Background/AnimatedBackground";
import Footer from "../Footer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "../Header";
import projects from "../../data/villas.json";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// ===== Variantes framer-motion (suaves y elegantes) =====
const easeOutExpo = [0.22, 1, 0.36, 1];

const pageV = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

const heroGroupV = {
  hidden: {},
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const fadeUpV = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

const gridV = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutExpo,
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const cardV = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

export default function ProjectDetails() {
  const [query, setQuery] = useState("");
  const [matchMode, setMatchMode] = useState("contains");
  const [view, setView] = useState("grid");
  const [location, setLocation] = useState("All");
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const project = useMemo(
    () => projects.find((p) => p.folder === projectId) ?? null,
    [projectId]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId, pathname]);

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

  const normalized = useMemo(
    () => projects.map((p) => ({ ...p, location: p.city })),
    []
  );

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

  if (!project) return <div className="loading">Loading Project...</div>;

  return (
    <>
      <Helmet>
        <title>{project.name}</title>
      </Helmet>

      {/* ===== Página completa: fade-in suave ===== */}
      <section
        id="project-details"
        className="relative z-20 min-h-screen w-full flex flex-col gap-16 pt-24 bg-primary"
      >
        <div className="absolute inset-0 -z-10 bg-black opacity-80" />
        <AnimatedBackground />
        <Header className={"is-clear"} />

        {/* ===== HERO (título + meta + descripción) con stagger ===== */}
        <motion.div
          className="relative"
          variants={heroGroupV}
          initial="hidden"
          animate="visible"
        >
          <div className="px-8 mb-6">
            <div className="flex flex-col w-full items-start">
              <motion.h1
                variants={fadeUpV}
                className="text-4xl font-bold text-primary mb-2"
              >
                {project.name}
              </motion.h1>

              <motion.h2
                variants={fadeUpV}
                className="font-bold text-sm lg:text-lg text-primary/80"
              >
                {project.address}
              </motion.h2>

              <motion.h2
                variants={fadeUpV}
                className="font-semibold text-sm lg:text-lg mb-4 text-primary/80"
              >
                {project.areas_info ? (
                  <span>
                    {" "}
                    {t(
                      `project_details.project_description.${project.folder}.areas_info`
                    )}{" "}
                  </span>
                ) : (
                  <>
                    <span>{project.bedrooms} </span>
                    <span>{t("project_details.bedrooms")}</span>
                    <span> ● </span>
                    <span>{project.bathrooms}</span>
                    <span> {t("project_details.bathrooms")}</span>
                  </>
                )}
              </motion.h2>

              <motion.p
                variants={fadeUpV}
                className="text-xs lg:text-lg lg:w-3/5"
              >
                {t(
                  `project_details.project_description.${project.folder}.description`
                )}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ===== GRID: aparece después y anima cada tarjeta con stagger ===== */}
        <motion.div
          key="grid"
          variants={gridV}
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="px-8 pb-32 min-h-screen"
        >
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            <AnimatePresence mode="popLayout">
              <PhotoProvider>
                {[...Array(project.total_images)].map((_, index) => {
                  const isRightEdgeLg = isLg && (index + 1) % 3 === 0;

                  return (
                    <motion.article
                      layout
                      key={`${project.folder}-${index}`}
                      variants={cardV}
                      initial="visible"
                      className="group aspect-video p-3 relative cursor-pointer"
                    >
                      <span
                        className={`${
                          isLg && "hidden"
                        } left-span absolute -bottom-8 lg:-bottom-4 left-0 lg:-left-5 -translate-x-1/2 text-primary opacity-40 text-2xl`}
                      >
                        +
                      </span>

                      <span
                        className={`right-span absolute -bottom-8 lg:-bottom-8 right-0 lg:-right-5 translate-x-1/2 text-primary opacity-40 text-2xl ${
                          isRightEdgeLg ? "no-sign" : ""
                        }`}
                      >
                        +
                      </span>

                      <div className="overflow-hidden shadow-[0_18px_35px_-10px_rgba(0,0,0,.45)]">
                        <PhotoView
                          src={`/assets/images/${project.folder}/${
                            index + 1
                          }.jpeg`}
                        >
                          <img
                            src={`/assets/images/${project.folder}/${
                              index + 1
                            }.jpeg`}
                            alt={`Slide ${index + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="h-[180px] sm:h-[200px] md:h-[220px] lg:aspect-video lg:h-full w-full object-contain"
                          />
                        </PhotoView>
                      </div>
                    </motion.article>
                  );
                })}
              </PhotoProvider>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ===== Footer: fade-in breve ===== */}
        <motion.div
          className="sticky inset-x-0 bottom-0 mix-blend-difference"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.45, ease: easeOutExpo },
          }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <Footer className={""} />
        </motion.div>
      </section>
    </>
  );
}
