import { useState } from "react";
import "../src/assets/fonts/Noirden-Bold.css";
import "../src/assets/fonts/Noirden-Regular.css";
import "../src/assets/fonts/Noirden-Light.css";

import Cover from "./components/Cover";
import About from "./components/About";
import ReactLenis from "lenis/react";
import Technologies from "./components/Technologies";

function App() {
  return (
    <>
      <ReactLenis options={{ duration: 0.9 }} root></ReactLenis>
      <Cover />
      <About />
      <Technologies />
    </>
  );
}

export default App;
