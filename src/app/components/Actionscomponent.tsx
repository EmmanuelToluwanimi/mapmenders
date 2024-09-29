"use client";
import { HealthCenter } from "@/interface";
import { Assets } from "@/utils/constants";
import L, { LatLngExpression } from "leaflet";
import React from "react";
import { FormEvent, useState } from "react";
import { useMap } from "react-leaflet";
export interface FilterQuery {
  category: string;
  type: string;
  status: string;
  ownership: string;
  searchTerm: string;
}
export interface HealthCenterSearchProps {
  isOpen: boolean;
  data: HealthCenter[];
  filterQuery: FilterQuery;
  setIsOpen: (value: boolean) => void;
  setFilterQuery: (params: FilterQuery) => void;
  isPublic: (params: string) => boolean;
}

const HealthCenterSearch = ({
  data: healthCenters,
  filterQuery,
  setFilterQuery,
  isPublic,
  isOpen,
  setIsOpen,
}: HealthCenterSearchProps) => {
  const publicHealthIcon = L.icon({
    iconUrl: Assets.greenIcon, // Path to your green icon
    iconSize: [25, 41], // Adjust size if needed
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const privateHealthIcon = L.icon({
    iconUrl: Assets.redIcon, // Path to your red icon
    iconSize: [25, 41], // Adjust size if needed
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const map = useMap();

  const ownership = ["Private", "Public"];
  const status = ["Functional", "Unknown"];
  const type = ["Primary", "Secondary", "Tertiary"];
  const category = [
    "Comprehensive Health Center",
    "Cottage Hospital",
    "Dispensary",
    "Educational Clinic",
    "Federal Medical Center",
    "Federal Staff Clinic",
    "General Hospital",
    "Maternity Home",
    "Medical Center",
    "Military and Paramilitary Clinic",
    "Primary Health Center",
    "Private Non Profit",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.length < 3) return;
    setFilterQuery({
      ...filterQuery,
      searchTerm,
    });
  };

  function PanToLocation(params: LatLngExpression) {
    map.flyTo(params, 14);
    return;
  }

  function ResetFilter() {
    setFilterQuery({
      ownership: "All",
      category: "",
      status: "",
      type: "",
      searchTerm: "",
    });
    setSearchTerm("");
  }

  function OpenPopup(params: LatLngExpression, center: HealthCenter) {
    const markerPosition: LatLngExpression = params;
    const popupContent = `
  <div class="py-2 rounded-lg gap-2 flex flex-col">
    <!-- Health center details -->
    <div class="flex gap-3 items-center">
      <img
        src="${
          isPublic(center.ownership) ? Assets.green2Icon : Assets.red2Icon
        }"
        alt="location"
      />
      <h3 class="text-sm font-semibold text-blue-600">
        ${center.prmry_name}
      </h3>
    </div>
    <div class="flex gap-2 items-center">
      <img src="${Assets.markerIcon}" alt="location" />
      <div class="text-xs text-gray-600">
        ${center.wardname}, ${center.lganame} LGA
      </div>
    </div>
    <div class="flex gap-2 items-center">
      <img src="${Assets.locationIcon}" alt="location" />
      <div class="text-xs text-gray-600">
        ${center.latitude} ${center.longitude}
      </div>
    </div>
    <div class="flex flex-wrap gap-2">
      <span class="text-xs shadow bg-blue-100 text-blue-700 px-1 py-1 rounded-lg">
        ${center.type}
      </span>
      <span class="text-xs shadow bg-blue-100 text-blue-700 px-1 py-1 rounded-lg">
        ${center.category}
      </span>
      <span
        class="text-xs shadow px-2 py-1 rounded-lg ${
          center.func_stats === "Functional"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }"
      >
        ${center.func_stats}
      </span>
    </div>
  </div>
`;

    // Create a marker and bind the popup
    const marker = L.marker(markerPosition, {
      icon: isPublic(center.ownership) ? publicHealthIcon : privateHealthIcon,
    })
      .addTo(map)
      .bindPopup(popupContent);

    // Pan the map and open the popup
    map.setView(markerPosition, 13); // Zoom level 13 or any suitable zoom
    marker.openPopup();
  }

  return (
    <div
      className="w-[500px] p-5 bg-white absolute top-5 left-10 shadow-lg rounded-[18px]"
      style={{ zIndex: 1000 }}
    >
      <div className="mb-2 text-right">
        <button
          onClick={() => {
            setIsOpen(false);
            ResetFilter();
          }}
          className="text-xl border px-3 py-1 rounded-full"
        >
          x
        </button>
      </div>
      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 items-start mb-6">
        <form
          onSubmit={handleSearch}
          className="flex gap-4 items-center w-full justify-between"
        >
          <div className="w-[70%] p-2 border border-gray-300 bg-[#F1F1F1] text-blue-500 flex items-center gap-2 rounded-lg">
            <div>
              <img src={Assets.searchIcon} alt="search" />
            </div>
            <input
              type="search"
              placeholder="Search by name or LGA..."
              minLength={3}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full focus:outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>
        </form>

        {/* Filter Section */}
        <div className="border rounded-lg p-4 flex flex-col gap-2">
          <div>Filter</div>
          <div className="grid grid-cols-4 gap-4">
            <select
              onChange={(e) =>
                setFilterQuery({ ...filterQuery, ownership: e.target.value })
              }
              defaultValue={"All"}
              value={filterQuery.ownership}
              className="p-2 text-xs bg-[#F1F1F1] border border-gray-300 rounded-lg"
            >
              <option value={"All"}>All</option>
              {ownership.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) =>
                setFilterQuery({ ...filterQuery, status: e.target.value })
              }
              value={filterQuery.status}
              className="p-2 text-xs bg-[#F1F1F1] border border-gray-300 rounded-lg"
            >
              <option value={""}>Status</option>
              {status.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) =>
                setFilterQuery({ ...filterQuery, type: e.target.value })
              }
              value={filterQuery.type}
              className="p-2 text-xs bg-[#F1F1F1] border border-gray-300 rounded-lg"
            >
              <option value={""}>Type</option>
              {type.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) =>
                setFilterQuery({ ...filterQuery, category: e.target.value })
              }
              value={filterQuery.category}
              className="p-2 text-xs bg-[#F1F1F1] border border-gray-300 rounded-lg"
            >
              <option value={""}>Category</option>
              {category.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {healthCenters.length ? (
        <div className="text-right">
          <button
            onClick={ResetFilter}
            className="px-2 py-1 border shadow-sm rounded-lg capitalize text-gray-500 mb-2"
          >
            x clear filter
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* Results Section */}
      <div className="flex justify-between">
        <h2 className="text-gray-500 font-medium">Search results</h2>
        <span className="text-blue-700 font-medium  bg-blue-200 text-xs px-2 py-1 rounded-lg">
          {healthCenters.length} results
        </span>
      </div>

      {/* Scrollable Card Section */}
      <div className="max-h-[400px] overflow-y-auto mt-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {healthCenters.map((center) => (
            <div
              key={center.globalid}
              className="p-4 bg-[#F1F1F1] rounded-lg shadow flex flex-col gap-2"
            >
              {/* Health center details */}
              <div className="flex gap-3 items-center">
                <img
                  src={
                    isPublic(center.ownership)
                      ? Assets.green2Icon
                      : Assets.red2Icon
                  }
                  alt="location"
                />
                <h3 className="text-sm font-semibold text-blue-600">
                  {center.prmry_name}
                </h3>
              </div>
              <div className="flex gap-2 items-center">
                <img src={Assets.markerIcon} alt="location" />
                <p className="text-xs text-gray-600">
                  {center.wardname}, {center.lganame} LGA
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img src={Assets.locationIcon} alt="location" />
                <p className="text-xs text-gray-600">
                  {center.latitude + " " + center.longitude}
                </p>
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
              <button
                onClick={() => {
                  PanToLocation([center.latitude, center.longitude]);
                  setIsOpen(!isOpen);
                  OpenPopup([center.latitude, center.longitude], center);
                }}
                className="flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              >
                <img src={Assets.mapIcon} alt="map" />
                <span>Go to map</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthCenterSearch;
