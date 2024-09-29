"use client";
import { useState } from "react";
import HealthCentersMap from "./components/Healthcentersmap";
import Navbar from "./components/Navbar";
import FixedCompass from "./components/FixedCompass";
// import HealthCenterSearch from "./components/Actionscomponent";
// import MapComponent from "./components/Mapcomponent";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar
        tab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <FixedCompass />
      <section>
        {/* <MapComponent /> */}
        <HealthCentersMap
          filter={activeTab}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </section>
    </>
  );
}
