import React, { forwardRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const WhatsappButton = forwardRef((props, ref) => {
  return (
    <a
      href="https://wa.me/17865661632"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full"
    >
      <div
        ref={ref}
        className={`fixed z-[200] ${
          props.className ?? "bottom-12"
        } right-4 w-20 h-20 flex items-center justify-centers transition-all duration-500`}
      >
        <DotLottieReact
          className="w-full h-full"
          src="/assets/lottie/whatsapp_animated_dark.lottie"
          loop
          autoplay
        />
      </div>
    </a>
  );
});

export default WhatsappButton;
