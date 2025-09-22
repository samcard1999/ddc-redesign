import React from "react";
import items from "../../data/investments.json";
import { InvestmentCard } from "../helpers/InvestmentCard";
import AnimatedBackground from "../Background/AnimatedBackground";
import Header from "../Header";
import LeadConnectorWidget from "../../Form/LeadConnectorWidget";

const InvestmentsInsideMobile = () => {
  return (
    <section className="min-h-screen h-auto w-full px-8 pb-20 pt-32 flex flex-col gap-16 bg-primary relative z-20">
      <div className="absolute inset-0 -z-10 bg-black/80" />
      <AnimatedBackground />
      <Header className={"is-clear"} />
      <img
        src="assets/investments/investment_map_mobile.png"
        alt="investment map mobile"
        className="w-full h-auto object-contain"
      />
      <div className="flex flex-col justify-center items-center gap-8">
        <h2 className="text-5xl font-bold self-start">Plans</h2>
        {items.map((card) => (
          <InvestmentCard
            title={card.title}
            asset_type={card.asset_type}
            construction_term={card.construction_term}
            investor_profile={card.investor_profile}
          />
        ))}
      </div>
      <LeadConnectorWidget className=" " />
    </section>
  );
};

export default InvestmentsInsideMobile;
