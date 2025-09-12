import React from "react";

const Footer = ({ className }) => {
  return (
    <footer
      className={`${className} z-50 grid grid-cols-3 grid-flow-col w-full items-center absolute bottom-4 left-0 px-8 lg:px-12 lg:bottom-8 text-sm lg:text-lg font-bold`}
    >
      <a
        href="/"
        className="hover:text-white transition-colors duration-300 justify-self-start"
      >
        Investments
      </a>
      <a
        href="/"
        className="hover:text-white transition-colors duration-300 justify-self-center"
      >
        Projects
      </a>
      <a
        href="/"
        className="hover:text-white transition-colors duration-300 justify-self-end"
      >
        Technologies
      </a>
    </footer>
  );
};

export default Footer;
