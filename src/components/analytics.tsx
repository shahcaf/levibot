"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "levibots-consent";

export function Analytics() {
  const [enabled, setEnabled] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const update = () => setEnabled(window.localStorage.getItem(CONSENT_KEY) === "accepted");
    update();
    window.addEventListener("levibots:consent", update);
    return () => window.removeEventListener("levibots:consent", update);
  }, []);

  if (!measurementId || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
