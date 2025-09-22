import React, { useEffect } from "react";

const LeadConnectorWidget = ({ width = "100%", className = "" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Limpieza: elimina el script al desmontar
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="appointment" className={`relative h-fit ${className}`}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/1FWmMbyLslj9CnJDOv7e"
        style={{
          width: width,

          border: "none",
          overflow: "visible",
        }}
        id="1FWmMbyLslj9CnJDOv7e_1747676594550"
        title="LeadConnector Booking Widget"
      />
    </div>
  );
};

export default LeadConnectorWidget;
