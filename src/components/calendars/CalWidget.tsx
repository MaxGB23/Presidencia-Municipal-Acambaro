"use client"
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "citas" });
      cal("ui", { theme: "dark", "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])
  return <Cal namespace="citas"
    calLink="centro-caf-acambaro/citas"
    style={{ width: "100%", height: "100%", overflow: "scroll" }}
    config={{ "layout": "month_view" }}


  />;
};
