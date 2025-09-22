import React from "react";
import HoverAnimatedLink from "./helpers/HoverAnimatedLink";
import { useTranslation } from "react-i18next";

const Footer = ({ className }) => {
  const { t } = useTranslation();
  return (
    <footer
      className={`${className} z-50 grid grid-cols-3 grid-flow-col w-full items-center absolute bottom-4 left-0 px-8 lg:px-12 lg:bottom-8 text-sm lg:text-lg font-bold`}
    >
      <HoverAnimatedLink
        text={t("footer_banner.investments")}
        href={"/investments"}
        className="justify-self-start"
      />

      <HoverAnimatedLink
        text={t("footer_banner.projects")}
        href={"/projects"}
        className="justify-self-center"
      />

      <HoverAnimatedLink
        text={t("footer_banner.technologies")}
        href={"/technologies"}
        className="justify-self-end"
      />
    </footer>
  );
};

export default Footer;
