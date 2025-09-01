import { useLayoutEffect, useState } from "react";
import "../src/assets/fonts/Noirden-Bold.css";
import "../src/assets/fonts/Noirden-Regular.css";
import "../src/assets/fonts/Noirden-Light.css";
import Cover from "./components/Cover";
import About from "./components/About";
import ReactLenis from "lenis/react";
import Technologies from "./components/Technologies";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Investments from "./components/Investments";

gsap.registerPlugin(ScrollTrigger);
function App() {
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

    return () => st.kill();
  }, []);
  return (
    <>
      <ReactLenis options={{ duration: 0.9 }} root></ReactLenis>
      <Cover />
      <About />
      <Technologies />
      <Investments />
    </>
  );
}

export default App;
