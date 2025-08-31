import React from "react";

const Header = () => {
  return (
    <header
      id="header"
      className="w-full h-auto fixed top-0 left-0 grid grid-cols-3 items-center p-8 z-50 mix-blend-difference"
    >
      {/* Logo izquierdo */}
      <a href="/" className="cursor-pointer justify-self-start">
        <span className="sr-only">Home</span>
        <img
          src="assets/svg/logo_letters_white.svg"
          alt="logo_letters_white"
          className="hidden lg:block h-4 w-auto"
        />
        <h2 className="font-light lg:hidden">
          <span className="font-bold">EN</span> | ES
        </h2>
      </a>

      {/* Logo central */}
      <a href="/" className="cursor-pointer justify-self-center">
        <img
          src="assets/svg/logo_circle_white.svg"
          alt="logo_circle_white"
          className="w-12 aspect-square"
        />
      </a>

      {/* Menú derecho */}
      <div className="flex gap-10 justify-self-end items-center ">
        <h2 className="font-light  hidden lg:block">
          <span className="font-bold">English</span> | Spanish
        </h2>
        <h2 className="hidden lg:block font-bold text-lg">Menu</h2>
        <div className="lg:hidden flex flex-col w-8 gap-1">
          <div className="w-full h-[2px] bg-primary"></div>
          <div className="w-full h-[2px] bg-primary"></div>

          <div className="w-full h-[2px] bg-primary"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
