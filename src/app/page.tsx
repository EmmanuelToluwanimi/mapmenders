"use client";
import { useState } from "react";
// import HealthCentersMap from "./components/Healthcentersmap";
import Navbar from "./components/Navbar";
import dynamic from "next/dynamic";
import React from "react";
import MapmendersOverlay from "./components/Welcome";

// const HealthCentersMap = dynamic(
//   () => import("./components/Healthcentersmap"),
//   { ssr: false }
// );
const NigeriaHealthCentersMap = dynamic(
  () => import("./components/Nigeriahealthmap"),
  { ssr: false }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState(!false);

  if (typeof window === "undefined") {
    // Client-side-only code
    return <></>;
  }

  return (
    <>
      {overlay && <MapmendersOverlay onClose={() => setOverlay(!overlay)} />}
      <Navbar
        tab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <section>
        {/* <HealthCentersMap
          filter={activeTab}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        /> */}
        <NigeriaHealthCentersMap
          filter={activeTab}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </section>
    </>
  );
}
