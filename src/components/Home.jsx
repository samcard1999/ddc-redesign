import React, { useEffect } from "react";
import Cover from "./Cover";
import About from "./About";
import Technologies from "./Technologies";
import Investments from "./Investments";
import { useLocation } from "react-router-dom";
import OurProcess from "./OurProcess";
import TeamSection from "./Team";
import { useMediaQuery } from "react-responsive";
import TeamSectionMobile from "./TeamSectionMobile";
import OurCultureMobile from "./OurCultureMobile";
import Testimonials from "./Testimonials";
import Projects from "./Projects";

const Home = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    if (location.pathname === "/about") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/investments") {
      document
        .getElementById("investments")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/technologies") {
      document
        .getElementById("technologies")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/contact") {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
  return (
    <main className="w-full h-auto">
      <Cover />
      <About />
      <Technologies />
      <Projects />
      <Investments />
      <OurProcess />

      {isDesktop ? <TeamSection /> : <TeamSectionMobile />}
      {isDesktop ? (
        ""
      ) : (
        <OurCultureMobile videoSrc="assets/video/our-culture.mp4" />
      )}
      <Testimonials />
    </main>
  );
};

export default Home;
