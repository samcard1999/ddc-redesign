import React from "react";
import AnimatedBackground from "../Background/AnimatedBackground";
import PrimaryButton from "../buttons/PrimaryButton";

const InvestorHub = () => {
  return (
    <section className="h-screen w-auto px-8 py-32 relative bg-primary z-20 flex flex-col justify-start items-start gap-20">
      <div className="absolute inset-0 -z-10 opacity-80 bg-black"></div>
      <AnimatedBackground />
      <div className="flex flex-col w-full gap-4 justify-start items-start 2xl-custom:absolute 2xl-custom:left-0 2xl-custom:top-32 2xl-custom:px-8 2xl:relative 2xl:inset-auto 2xl:px-0 isolate">
        <div className="flex w-full justify-between items-center text-secondary">
          <h1 className="lg:text-5xl text-[2.1rem] lg:leading-normal leading-10 font-bold">
            Inside the DDC Panel System
          </h1>
          <PrimaryButton className="hidden lg:block bg-secondary text-xl !py-3 !px-6 text-primary">
            Book 30-min Intro
          </PrimaryButton>
        </div>
        <h2 className="lg:text-xl text-secondary text-left">
          What makes DDC different<br className="lg:hidden"></br> (construction
          - first)
        </h2>
        <PrimaryButton className="bg-secondary  mt-6 text-primary  lg:hidden">
          Book 30-min Intro
        </PrimaryButton>
      </div>
      <div className="absolute inset-0 -z-10  bg-primary  mix-blend-screen">
        <div className="grid grid-cols-3 grid-rows-2 w-full h- aspect-video  gap-16 items-center justify-center px-8 pt-80">
          <div className="flex h-full flex-col justify-center items-center gap-4 text-primary bg-black">
            <h2>Probando</h2>
            <p>holassadasdasd adjsunad </p>
          </div>
          <div className="flex h-full  flex-col justify-center items-center gap-4 text-primary bg-black">
            <h2>Probando</h2>
            <p>holassadasdasd adjsunad </p>
          </div>
          <div className="flex h-full  flex-col justify-center items-center gap-4 text-primary bg-black">
            <h2>Probando</h2>
            <p>holassadasdasd adjsunad </p>
          </div>
          <div className="flex h-full  flex-col justify-center items-center gap-4 text-primary bg-black">
            <h2>Probando</h2>
            <p>holassadasdasd adjsunad </p>
          </div>
          <div className="flex h-full  flex-col justify-center items-center gap-4 text-primary bg-black">
            <h2>Probando</h2>
            <p>holassadasdasd adjsunad </p>
          </div>
          <div className="flex h-full  flex-col justify-center items-center gap-4 text-primary bg-black">
            <h2>Probando</h2>
            <p>holassadasdasd adjsunad </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorHub;
