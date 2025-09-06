import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import Footer from "./Footer";
import AnimatedBackground from "./Background/AnimatedBackground";

const Investments = () => {
  return (
    <section
      id="investments"
      className="w-full h-screen flex flex-col justify-center bg-primary z-20 gap-12 py-32 px-8 items-center relative"
    >
      <div className="absolute inset-0 -z-10 opacity-80 bg-black"></div>
      <AnimatedBackground />
      <div className="flex flex-col w-full gap-4 justify-start items-start 2xl-custom:absolute 2xl-custom:left-0 2xl-custom:top-32 2xl-custom:px-8 2xl:relative 2xl:inset-auto 2xl:px-0">
        <div className="flex w-full justify-between items-center">
          <h1 className="lg:text-5xl text-[2.1rem] lg:leading-normal leading-10 font-bold">
            Why invest with DDC Developments?
          </h1>
          <PrimaryButton
            href="/investor-hub"
            className="hidden lg:block bg-primary text-xl !py-3 !px-6 text-secondary"
          >
            Investor Hub
          </PrimaryButton>
        </div>
        <h2 className="lg:text-xl text-left">
          What makes DDC different<br className="lg:hidden"></br> (construction
          - first)
        </h2>
        <PrimaryButton
          href="/investor-hub"
          className="bg-primary  mt-6 text-secondary self-center lg:hidden"
        >
          Investor Hub
        </PrimaryButton>
      </div>

      <div className="flex flex-col w-full lg:gap-12 max-w-[90%] lg:max-w-[70%] h-auto">
        <div className="lg:flex-row flex flex-col">
          <div className="w-full h-full flex flex-col justify-center items-center relative py-6 lg:py-0">
            <span className="absolute -top-5 left-0 -translate-x-1/2 lg:-translate-x-1/2 text-primary opacity-40 text-2xl lg:text-4xl">
              +
            </span>
            <span className="absolute -top-5 lg:-bottom-5 lg:top-auto right-0 lg:right-full translate-x-1/2 lg:translate-x-1/2 text-primary opacity-40 text-2xl lg:text-4xl">
              +
            </span>

            <h2 className="lg:text-4xl text-2xl text-center font-bold">
              End to end
              <br className="hidden lg:block" /> Platform
            </h2>
            <p className="text-gray-400 text-sm text-center">
              From acquisition to pre-sale<br className="lg:hidden"></br> under
              one
            </p>
          </div>
          <div className="  lg:border-l lg:border-primary w-full h-full flex flex-col justify-center items-center relative py-6 lg:py-0">
            <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[0.5px] lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:w-[0.5px] lg:h-[85%] bg-primary"></div>

            <span className="absolute top-0 lg:-top-5  right-0 -translate-y-1/2 lg:translate-y-0 translate-x-1/2 lg:translate-x-1/2 text-primary opacity-40 text-2xl lg:text-4xl">
              +
            </span>
            <span className="absolute lg:-bottom-5 lg:top-auto top-0  left-0 lg:left-full -translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-primary opacity-40 text-2xl lg:text-4xl">
              +
            </span>

            <h2 className="lg:text-4xl text-2xl font-bold text-center">
              40+ properties<br className="hidden lg:block"></br> developed
            </h2>
            <p className="text-gray-400 text-sm text-center">
              Proven delivery across markets.
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-full bg-primary h-[0.5px]"></div>
        <div className="lg:flex-row flex flex-col">
          <div className="w-full h-full flex flex-col justify-center items-center relative py-6 lg:py-0">
            <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[0.5px] lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:w-[0.5px] lg:h-[85%] bg-primary"></div>

            <span className="absolute top-0 lg:-top-5 left-0 -translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-primary opacity-40 text-2xl lg:text-4xl">
              +
            </span>
            <span className="absolute top-0 lg:-bottom-5 lg:top-auto right-0 lg:right-full -translate-y-1/2 lg:translate-y-0 translate-x-1/2 lg:translate-x-1/2 text-primary opacity-40 text-2xl lg:text-4xl">
              +
            </span>

            <h2 className="lg:text-4xl text-2xl text-center font-bold">
              $650 M real estate<br></br> transactions
            </h2>
            <p className="text-gray-400 text-sm text-center">
              From acquisition to pre-sale, under one playbook.
            </p>
          </div>
          <div className="  lg:border-l lg:border-primary w-full h-full flex flex-col justify-center items-center relative py-6 lg:py-0">
            <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[0.5px] lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:w-[0.5px] lg:h-[85%] bg-primary"></div>

            <span className="absolute top-0 lg:-top-5  right-0 -translate-y-1/2 lg:translate-y-0 translate-x-1/2 lg:translate-x-1/2 text-primary opacity-40 text-2xl lg:text-4xl">
              +
            </span>
            <span className="absolute lg:-bottom-5 lg:top-auto top-0  left-0 lg:left-full -translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 lg:translate-y-0 text-primary opacity-40 text-2xl lg:text-4xl">
              +
            </span>

            <h2 className="lg:text-4xl text-2xl font-bold text-center">
              $50M+ under<br></br> management
            </h2>
            <p className="text-gray-400 text-sm text-center">
              Scale with disciplined governance.
            </p>
          </div>
        </div>
      </div>
      <Footer className={"text-primary"} />
    </section>
  );
};

export default Investments;
