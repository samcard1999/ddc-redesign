import { useLayoutEffect, useState } from "react";
import "../src/assets/fonts/Noirden-Bold.css";
import "../src/assets/fonts/Noirden-Regular.css";
import "../src/assets/fonts/Noirden-Light.css";
import About from "./components/About";
import ReactLenis from "lenis/react";
import Technologies from "./components/Technologies";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Investments from "./components/Investments";
import Home from "./components/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TechnologiesInside from "./components/Interior/TechnologiesInside";
import { Toaster } from "sonner";
import ProjectsInside from "./components/Interior/ProjectsInside";
import ProjectDetails from "./components/Interior/ProjectDetails";
import HomeFooter from "./components/HomeFooter";
import TeamSectionMobile from "./components/TeamSectionMobile";
import OurCultureMobile from "./components/OurCultureMobile";
import Header from "./components/Header";
import Team from "./components/Team";
import InvestmentsInside1 from "./components/Interior/InvestmentsInside1";
import InvestmentsInsideMobile from "./components/Interior/InvestmentsInsideMobile";
import Investmentss from "./components/helpers/MapWithLinkedCards";
import InvestmentsInside from "./components/Interior/InvestmentsInside";

gsap.registerPlugin(ScrollTrigger);
function App() {
  const [isLg, setIsLg] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => setIsLg(e.matches);
    setIsLg(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    const header = document.getElementById("header");
    const about = document.getElementById("about");

    const st = ScrollTrigger.create({
      trigger: "#about",
      start: "top top+=8%", // ajusta 80 a la altura del header
      end: "bottom top+=8%",
      toggleClass: { targets: header, className: "is-dark" },
    });
    // Activa la clase mientras el top del header está "dentro" de la sección
    const st2 = ScrollTrigger.create({
      trigger: "#technologies",
      start: "top top+=18%", // ajusta 80 a la altura del header
      end: "bottom ",
      toggleClass: { targets: header, className: "is-clear" },
    });
    const st3 = ScrollTrigger.create({
      trigger: "#our-process",
      start: "top top+=18%", // ajusta 80 a la altura del header
      end: "bottom ",
      toggleClass: { targets: header, className: "is-dark" },
    });

    const st4 = ScrollTrigger.create({
      trigger: "#projects",
      start: "top top+=18%", // ajusta 80 a la altura del header
      end: "bottom ",
      toggleClass: { targets: header, className: "is-dark" },
    });
    const st5 = ScrollTrigger.create({
      trigger: "#testimonials",
      start: "top top+=18%", // ajusta 80 a la altura del header
      end: "bottom ",
      toggleClass: { targets: header, className: "is-dark" },
    });

    return () => {
      st.kill();
      st2.kill();
      st3.kill();
      st4.kill();
      st5.kill();
    };
  }, []);
  const location = useLocation();
  const hideFooter =
    location.pathname === "/privacy-policy" ||
    location.pathname === "/projects";

  return (
    <>
      <ReactLenis options={{ duration: 0.9 }} root />
      <Toaster position="bottom-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route
          path="/investments"
          element={isLg ? <InvestmentsInside1 /> : <InvestmentsInsideMobile />}
        />
        <Route path="/technologies" element={<TechnologiesInside />} />

        <Route
          path="/team"
          element={
            isLg ? (
              <>
                <Header />
                <Team />
              </>
            ) : (
              <>
                <Header />
                <TeamSectionMobile />
                <OurCultureMobile />
              </>
            )
          }
        />

        <Route path="/projects" element={<ProjectsInside />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Ruta fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* 👇 Solo muestra el footer si NO es la ruta /privacy-policy */}
      {!hideFooter && <HomeFooter />}
    </>
  );
}

export default App;
