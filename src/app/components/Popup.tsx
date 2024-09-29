"use client"
import { HealthCenter } from "@/interface";
import { Assets } from "@/utils/constants";
import React from "react";

interface PopupContentProps {
  center: HealthCenter;
  IsPublic: (params: string) => boolean;
}
export default function PopupContent({ center, IsPublic }: PopupContentProps) {
  return (
    <div key={center.globalid} className="py-2 rounded-lg gap-2 flex flex-col">
      {/* Health center details */}
      <div className="flex gap-3 items-center">
        <img
          src={IsPublic(center.ownership) ? Assets.green2Icon : Assets.red2Icon}
          alt="location"
        />
        <h3 className="text-sm font-semibold text-blue-600">
          {center.prmry_name}
        </h3>
      </div>
      <div className="flex gap-2 items-center">
        <img src={Assets.markerIcon} alt="location" />
        <div className="text-xs text-gray-600">
          {center.wardname}, {center.lganame} LGA
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <img src={Assets.locationIcon} alt="location" />
        <div className="text-xs text-gray-600">
          {center.latitude + " " + center.longitude}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs shadow bg-blue-100 text-blue-700 px-1 py-1 rounded-lg">
          {center.type}
        </span>
        <span className="text-xs shadow bg-blue-100 text-blue-700 px-1 py-1 rounded-lg">
          {center.category}
        </span>
        <span
          className={`text-xs shadow px-2 py-1 rounded-lg ${
            center.func_stats === "Functional"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {center.func_stats}
        </span>
      </div>

      {/* Button to go to map */}
      {/* <button
                onClick={() => {
                  PanToLocation([center.latitude, center.longitude]);
                  setIsOpen(!isOpen);
                }}
                className="flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              >
                <img src={Assets.mapIcon} alt="map" />
                <span>Go to map</span>
              </button> */}
    </div>
  );
}
