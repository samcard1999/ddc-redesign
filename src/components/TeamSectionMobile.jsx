import React from "react";
import AnimatedBackground from "./Background/AnimatedBackground";
import Footer from "./Footer";
import TeamAccordion from "./TeamAccordion";
import { useTranslation } from "react-i18next";

const TeamSectionMobile = () => {
  const { t } = useTranslation();
  return (
    <section className="h-auto w-full pt-32   text-primary bg-primary z-20 relative ">
      <div className="absolute inset-0 -z-10 opacity-80 bg-black" />
      <AnimatedBackground className="!h-[200vh]" />
      <h1 className="text-4xl font-bold mb-8 px-8">{t("team.title")}</h1>
      <TeamAccordion />
      {/* Fade inferior para desborde */}

      {/* Footer + gradiente inferior */}
      <div className="sticky bottom-0 left-0 w-full">
        <Footer className="" />
        <div className="pointer-events-none z-30 bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-black/40 from-50% to-transparent" />
      </div>
    </section>
  );
};

export default TeamSectionMobile;
