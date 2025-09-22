import React from "react";
import AnimatedBackground from "../Background/AnimatedBackground";
import Header from "../Header";
import Footer from "../Footer";
import { InvestmentCard } from "../helpers/InvestmentCard";
import LeadConnectorWidget from "../../Form/LeadConnectorWidget";

const items_left = [
  {
    title: "Punta Gorda Select",
    asset_type: "Single family home",
    construction_term: "9 meses después de permisos",
    investor_profile: "Inversor doméstico / internacional",
    className: "w-fit -translate-y-[20%]",
  },
  {
    title: "Punta Gorda Premium",
    asset_type: "Single family home",
    construction_term: "9 meses después de permisos",
    investor_profile: "Inversor doméstico / internacional",
    className: "w-fit translate-y-[35%]",
  },
];

const items_right = [
  {
    title: "Miami Premium - Coconut",
    asset_type: "Single family home (6000 sqft)",
    construction_term: "12 meses después de permisos",
    investor_profile: "Inversor doméstico / internacional",
    className: "w-fit -translate-y-[20%]",
  },
  {
    title: "Miami - Pinecrest",
    asset_type: "Single family home (7000 sqft)",
    construction_term: "12 meses después de permisos",
    investor_profile: "Inversor doméstico / internacional",
    className: "w-fit translate-y-[35%]",
  },
];

const InvestmentsInside1 = () => {
  return (
    <section className="min-h-screen h-auto w-full relative z-20 pt-32 bg-primary ">
      <div className="absolute inset-0 -z-10 bg-black/80" />
      <AnimatedBackground />
      <Header className={"is-clear"} />
      <div className="flex gap-2 justify-center items-center h-[80vh]">
        <div className="flex  flex-col ">
          {items_left.map((card) => {
            return (
              <InvestmentCard
                title={card.title}
                asset_type={card.asset_type}
                construction_term={card.construction_term}
                investor_profile={card.investor_profile}
                className={card.className}
              />
            );
          })}
        </div>

        <img
          className="h-full object-contain h-f"
          src="assets/investments/investment_map1.png"
          alt="investment map"
        />
        <div className="flex flex-col ">
          {items_right.map((card) => {
            return (
              <InvestmentCard
                title={card.title}
                asset_type={card.asset_type}
                construction_term={card.construction_term}
                investor_profile={card.investor_profile}
                className={card.className}
              />
            );
          })}
        </div>
      </div>

      <LeadConnectorWidget className="scale-90 pt-16 " />

      {/* Footer + gradiente inferior */}
      <div className="absolute lg:sticky bottom-0 left-0 w-full">
        <Footer className="text-primary px-8" />
        <div className="bottom-0 left-0 w-full h-[10vh] lg:h-[15vh] pointer-events-none bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
};

export default InvestmentsInside1;
