"use client";
import { useState } from "react";
import HealthCentersMap from "./components/Healthcentersmap";
import Navbar from "./components/Navbar";
import FixedCompass from "./components/FixedCompass";
// import MapComponent from "./components/Mapcomponent";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <Navbar tab={activeTab} setActiveTab={setActiveTab} />
      <FixedCompass />
      <section>
        {/* <MapComponent /> */}
        <HealthCentersMap filter={activeTab} />
      </section>
    </>
  );
}
