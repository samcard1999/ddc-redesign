import React from "react";
import HoverAnimatedLink from "./helpers/HoverAnimatedLink";

const Footer = ({ className }) => {
  return (
    <footer
      className={`${className} z-50 grid grid-cols-3 grid-flow-col w-full items-center absolute bottom-4 left-0 px-8 lg:px-12 lg:bottom-8 text-sm lg:text-lg font-bold`}
    >
      <HoverAnimatedLink
        text={"Investments"}
        href={"/investor-hub"}
        className="justify-self-start"
      />

      <HoverAnimatedLink
        text={"Projects"}
        href={"/projects"}
        className="justify-self-center"
      />

      <HoverAnimatedLink
        text={"Technologies"}
        href={"/technologies"}
        className="justify-self-end"
      />
    </footer>
  );
};

export default Footer;
