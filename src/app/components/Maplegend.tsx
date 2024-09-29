"use client";
import { Assets, selectedState } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useMap } from "react-leaflet";

function MapLegend() {
  const [isOpen, setIsOpen] = useState(false);
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <section
      className=" ml-auto bg-transparent absolute bottom-20 right-10"
      style={{ zIndex: "1000" }}
    >
      <div className="flex gap-12 items-center justify-between">
        <div className="bg-white min-w-[530px] p-4 rounded-lg text-sm border-b flex flex-col gap-3">
          <div className={`flex justify-between items-center`}>
            <div>Map Legend</div>
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="border border-[#C0DAFF] bg-[#F1F1F1] rounded w-8 h-8 flex items-center justify-center"
              >
                <img
                  className="text-blue-500"
                  src={isOpen ? Assets.chevrondownIcon : Assets.chevronupIcon}
                  alt=""
                />
              </button>
            </div>
          </div>
          {isOpen ? (
            <>
              <div className="flex justify-between items-center border-t pt-2 gap-4">
                <div className="flex items-center gap-2">
                  <img src={Assets.red2Icon} alt="" />
                  <span className="text-gray-400">Private Health Facility</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Assets.green2Icon} alt="" />
                  <span className="text-gray-400">Public Health Facility</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Assets.markerIcon} alt="" />
                  <span className="text-gray-400 capitalize font-semibold">
                    {selectedState} State
                  </span>
                </div>
              </div>
              <div className="flex justify-evenly">
                <div className="flex gap-2">
                  <span className="text-gray-400">Coordinate System</span>
                  <span className="text-gray-800">GCS WGS 1984</span>
                </div>
                {/* <div className="flex gap-2">
                  <span className="text-gray-400">Datum</span>
                  <span className="text-gray-800">WGS 1984</span>
                </div> */}
                <div className="flex gap-2">
                  <span className="text-gray-400">Units</span>
                  <span className="text-gray-800">Degree</span>
                </div>
              </div>
              <div className="border border-dashed border-gray-300 w-[90%] m-auto"></div>
              <div className="flex justify-evenly">
                <div className="flex gap-2">
                  <span className="text-gray-400">Data sourced from:</span>
                  <Link href={"https://data.grid3.org/datasets/GRID3::grid3-nga-health-facilities-/about"} className="text-blue-500">www.grid3.org</Link>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400">Icons from:</span>
                  <Link href={"https://www.isocons.app/"} className="text-blue-500">isocons.app</Link>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="bg-white rounded-lg px-3 py-5">
          <div className="flex flex-col gap-6">
            <button
              onClick={handleZoomIn}
              className={`text-white flex justify-center items-center h-10 w-10 rounded-lg bg-blue-500`}
            >
              <img src={Assets.plusIcon} alt="icon" />
            </button>
            <button
              onClick={handleZoomOut}
              className={`text-white flex justify-center items-center h-10 w-10 rounded-lg bg-blue-500`}
            >
              <img src={Assets.minusIcon} alt="icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapLegend;
