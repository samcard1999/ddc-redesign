import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCards, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import Footer from "./Footer";
import PrimaryButton from "./buttons/PrimaryButton";

/** Tarjeta (igual que antes) */
function TestimonialCard({ name, description, stars = 5, bgImage }) {
  return (
    <article className="slide-content relative h-full w-full text-primary will-change-transform rounded-md overflow-hidden">
      <img
        className="pointer-events-none absolute w-auto max-w-max object-cover"
        src={bgImage}
        alt="card background"
      />
      <div className="absolute top-6 right-6  text-xl select-none">
        {"★".repeat(Math.max(0, Math.min(5, stars)))}
        {"☆".repeat(Math.max(0, 5 - stars))}
      </div>
      <div className="absolute bottom-6 left-6 right-6 ">
        <h3 className="text-2xl lg:text-xl font-bold tracking-wide mb-4">
          {name}
        </h3>
        <p className="text-xs  ">{description}</p>
      </div>
    </article>
  );
}

const Testimonials = () => {
  const staticBackground = "/bg/testimonial_card_bg.webp";
  const items = [
    {
      name: "Victor Mesa Jr.",
      stars: 5,
      description:
        " Occaecat mollit reprehenderit aliqua dolor pariatur culpa ut. Ea proidenduis nisi. Commodo ad commodo ex magna. Nostrud labore do quis anim occaecat ullamco.",
    },
    {
      name: "Jane Doe",
      stars: 5,
      description:
        "ommodo pariatur quis ullamco incididunt. Qui pariatur esse pariatur exercitation anim nisi laboris amet.",
    },
    {
      name: "John Smith",
      stars: 4,
      description:
        "Ullamco  sint ex ut est ve elit elit esse. Commodo consequat aliquip enim sit anim proident cupidatat eiusmod exercitation excepteur nisi. Laboris tempor ad surunt laborum. Incididunt enim eu irure ad ex amet.",
    },
    {
      name: "Jane Doe",
      stars: 5,
      description:
        "Reprehenderit deserunt caecat amet mollit magna dolor amet dolor ipsum voluptate pariatur proident.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="h-screen w-full bg-primary text-secondary flex flex-col items-center justify-center gap-12 pt-32 lg:pt-20 pb-10 relative overflow-hidden"
    >
      <h1 className="text-4xl lg:text-5xl font-bold absolute left-8 top-20">
        Testimonials
      </h1>

      {/* Wrapper con perspectiva y láminas detrás (decorativo opcional) */}
      <div className="relative h-[60%] lg:h-[65%] aspect-[9/13]">
        <span className="absolute -top-16 lg:-top-8 left-0 lg:-left-8 -translate-x-1/2  text-secondary opacity-40 text-2xl ">
          +
        </span>
        <span className="absolute -top-16 lg:-top-8 right-0 lg:-right-8 translate-x-1/2 text-secondary opacity-40 text-2xl ">
          +
        </span>
        <span className="absolute -bottom-16 lg:-bottom-8 left-0 lg:-left-8 -translate-x-1/2  text-secondary opacity-40 text-2xl ">
          +
        </span>
        <span className="absolute -bottom-16 lg:-bottom-8 right-0 lg:-right-8 translate-x-1/2  text-secondary opacity-40 text-2xl ">
          +
        </span>

        <button className="hidden lg:block my-prev z-40 text-secondary absolute -left-1/2 top-1/2 -translate-y-1/2 hover:scale-110 hover:bg-gray-300 rounded-full cursor-pointer transition-all duration-300">
          <span className="sr-only">Prev</span>{" "}
          <svg
            viewBox="0 0 50.79 50.79"
            className="w-8 h-8 transition duration-300 stroke-current rotate-90"
          >
            <g>
              <circle cx="25.39" cy="25.39" r="24.89" fill="none" />
              <g>
                <line x1="25.39" y1="9.37" x2="25.39" y2="39.88" />
                <polyline
                  points="38.12 27.47 25.39 40.19 12.67 27.47"
                  fill="none"
                />
              </g>
            </g>
          </svg>
        </button>

        <button className="hidden lg:block my-next z-40 text-secondary absolute -right-1/2 top-1/2 -translate-y-1/2 hover:scale-110 hover:bg-gray-300 rounded-full cursor-pointer transition-all duration-300">
          <span className="sr-only">Next</span>{" "}
          <svg
            viewBox="0 0 50.79 50.79"
            className="w-8 h-8 transition duration-300 stroke-current -rotate-90"
          >
            <g>
              <circle cx="25.39" cy="25.39" r="24.89" fill="none" />
              <g>
                <line x1="25.39" y1="9.37" x2="25.39" y2="39.88" />
                <polyline
                  points="38.12 27.47 25.39 40.19 12.67 27.47"
                  fill="none"
                />
              </g>
            </g>
          </svg>
        </button>

        {/* Viewport con perspectiva real */}
        <div className="absolute inset-0 ">
          <Swiper
            modules={[Autoplay, EffectCards, Navigation]}
            className="w-full h-full"
            effect="cards"
            grabCursor={true}
            speed={650}
            navigation={{
              nextEl: ".my-next",
              prevEl: ".my-prev",
            }}
            // autoplay={{
            //   delay: 3500,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
          >
            {items.map((it, idx) => (
              <SwiperSlide
                key={idx}
                className="!w-full !h-full flex items-center justify-center"
              >
                <TestimonialCard
                  name={it.name}
                  description={it.description}
                  stars={it.stars}
                  bgImage={staticBackground}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <PrimaryButton className="text-primary bg-secondary text-xl !px-8 !py-3 hover:bg-secondary/50 hover:!text-secondary">
        Subscribe to our Newsletter
      </PrimaryButton>
      <Footer className="text-secondary" />
    </section>
  );
};

export default Testimonials;
