"use client";

import Script from "next/script";

export default function CalendlyWidget() {
  return (
    <div>
      <h1>Agenda tu cita</h1>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          (window as any).Calendly?.initInlineWidget({
            url: "https://calendly.com/cb147-gonzalez-ballesteros-max/centrocaf",
            parentElement: document.getElementById("calendly-inline"),
          });
        }}
      />

      <div
        id="calendly-inline"
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
    </div>
  );
}
