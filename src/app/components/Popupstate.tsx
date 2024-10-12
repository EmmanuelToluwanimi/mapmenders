"use client";
import { StateData } from "@/interface";
import { Assets } from "@/utils/constants";
import React from "react";

interface PopupContentStateProps {
  state: StateData;
  SetThisState: () => void;
}
export default function PopupContentState({
  state,
  SetThisState,
}: PopupContentStateProps) {
  return (
    <div className="py-2 rounded-lg gap-2 flex flex-col">
      {/* Health center details */}
      <div className="flex gap-3 items-center">
        <img src={Assets.naijaFlagIcon} alt="location" />
        <h3 className="text-sm font-semibold text-blue-600">
          {state.statename}
        </h3>
      </div>
      <div className="flex gap-2 items-center text-xs">
        <div>Capital:</div>
        <div className=" text-gray-600 capitalize">{state.Capital}</div>
      </div>
      <div className="flex gap-2 items-center text-xs">
        <div>No. of LGA:</div>
        <div className=" text-gray-600 capitalize">{state.No_of_LGA}</div>
      </div>
      <div className="flex gap-2 items-center">
        <img src={Assets.locationIcon} alt="location" />
        <div className="text-xs text-gray-500 font-semibold">
          {state.latitude + ", " + state.longitude}
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center text-xs">
        <div className="text-blue-500">Primary Healthcare Facilities:</div>
        <div className=" bg-gray-300 capitalize px-2 py-1 rounded">
          {state.No_of_Primary}
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center text-xs">
        <div className="text-blue-500">Secondary Healthcare Facilities:</div>
        <div className=" bg-gray-300 capitalize px-2 py-1 rounded">
          {state.No_of_Secondary}
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center text-xs">
        <div className="text-blue-500">Tertiary Healthcare Facilities:</div>
        <div className=" bg-gray-300 capitalize px-2 py-1 rounded">
          {state.No_of_Tertiary}
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center text-xs">
        <div className="text-blue-500">Total Healthcare Facilities:</div>
        <div className=" bg-blue-300 text-blue-700 capitalize p-2 rounded">
          {state.Total}
        </div>
      </div>

      {/* Button to go to map */}
      <button
        onClick={SetThisState}
        className="flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
      >
        <img src={Assets.mapIcon} alt="map" />
        <span>View Health Facilities</span>
      </button>
    </div>
  );
}
