"use client";
import React, { ReactNode, useState } from "react";
import Navbar from "./Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <main>
      <Navbar tab={activeTab} setActiveTab={setActiveTab} />
      {children}
    </main>
  );
}
