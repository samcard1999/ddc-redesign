import React from "react";
import Accordion from "./Accordion";
import Footer from "./Footer";

import PrimaryButton from "./buttons/PrimaryButton";

const OurProcess = () => {
  return (
    <section
      id="our-process"
      className="h-auto min-h-screen lg:h-auto w-full pl-8 lg:pl-16 pr-8 pt-32 flex flex-col gap-8 bg-primary relative"
    >
      <div className="flex flex-col w-full gap-4 justify-start items-start 2xl-custom:absolute 2xl-custom:left-0 2xl-custom:top-32 2xl-custom:px-8 2xl:relative 2xl:inset-auto 2xl:px-0">
        <div className="flex w-full justify-between items-center">
          <h1 className="lg:text-5xl text-[2.1rem] lg:leading-normal text-secondary leading-10 font-bold">
            Our Process
          </h1>
          <PrimaryButton
            href="/investor-hub"
            className="hidden lg:block bg-secondary text-xl !py-3 !px-6 text-primary"
          >
            Investor Hub
          </PrimaryButton>
        </div>
      </div>
      <Accordion />
      <PrimaryButton
        href="/investor-hub"
        className="bg-secondary mt-6 text-primary self-center lg:hidden"
      >
        Investor Hub
      </PrimaryButton>

      <div className="absolute lg:sticky bottom-0 left-0 w-full">
        <Footer className={"text-secondary lg:!px-0"} />
        <div className=" bottom-0 left-0 w-full h-[10vh] lg:h-[15vh] pointer-events-none from-60% to-100% bg-gradient-to-t from-primary to-transparent"></div>
      </div>
    </section>
  );
};

export default OurProcess;
