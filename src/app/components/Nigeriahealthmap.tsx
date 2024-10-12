"use client";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { HealthCenter, StateData } from "@/interface";
import {
  Assets,
  defaultZoom,
  position,
  selectedState,
} from "@/utils/constants";
import MapLegend from "./Maplegend";
import HealthCenterSearch from "./Actionscomponent";
import PopupContent from "./Popup";
import FixedCompass from "./FixedCompass";
import React from "react";
import PopupContentState from "./Popupstate";

// Define interfaces for health centers and states
interface HealthCentersMapViewProps {
  filter: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const HealthCentersMapView = ({
  filter: ownership,
  isOpen,
  setIsOpen,
}: HealthCentersMapViewProps) => {
  const DefaultIcon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const publicHealthIcon = L.icon({
    iconUrl: Assets.greenIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const privateHealthIcon = L.icon({
    iconUrl: Assets.redIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const [stateName, setStateName] = useState("");
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [allHealthCenters, setAllHealthCenters] = useState<HealthCenter[]>([]);
  const [statesData, setStatesData] = useState<StateData[]>([]);
  const [filteredData, setFilteredData] = useState<HealthCenter[]>([]);
  const [sortedData, setSortedData] = useState<HealthCenter[]>([]);
  // const [currentZoom, setCurrentZoom] = useState(defaultZoom);
  const [filterQuery, setFilterQuery] = useState({
    category: "",
    type: "",
    status: "",
    searchTerm: "",
    ownership,
  });

  // Fetch States Data (states.json)
  async function GetStates() {
    try {
      const response = await fetch("/data/states.json");
      const data: StateData[] = await response.json();
      setStatesData(data);
    } catch (error) {
      console.error("Error fetching states data: ", error);
    }
  }

  // Fetch Health Centers Data (nga.json)
  async function GetAllHealthCenters() {
    try {
      const response = await fetch(`/data/${selectedState}.json`);
      const data: HealthCenter[] = await response.json();
      setAllHealthCenters(data);
    } catch (error) {
      console.error("Error fetching health centers data: ", error);
    }
  }

  // Fetch health centers based on state
  async function GetHealthCentersForState(stateName: string) {
    const response = await fetch(`/data/nga.json`);
    const allHealthCenters: HealthCenter[] = await response.json();
    const filteredCenters = allHealthCenters.filter(
      (center) => center.statename.toLowerCase() === stateName.toLowerCase()
    );
    setHealthCenters(filteredCenters); // Store all centers for state
    // applyFilters(filteredCenters); // Apply the filter immediately when loaded
  }

  const handleStateClick = (state: StateData) => {
    setHealthCenters([]);
    // setFilteredData([]);
    setStateName(state.statename); // Set active state for zooming and filtering
    // GetHealthCentersForState(state.statename); // Load health centers for the clicked state
  };

  function HandleFilter() {
    if (ownership === "Private") {
      const newData = healthCenters.filter((arg) => !IsPublic(arg.ownership));
      setFilteredData(newData);
    } else if (ownership === "Public") {
      const newData = healthCenters.filter((arg) => IsPublic(arg.ownership));
      setFilteredData(newData);
    } else {
      setFilteredData(healthCenters);
    }
  }

  function IsPublic(params: string) {
    return params !== "Others" && params !== "Private";
  }

  function ResetMap() {
    setStateName("");
    setHealthCenters([]);
  }

  // Zoom event listener for dynamic loading
  function ZoomListener() {
    const map = useMapEvents({
      zoom: () => {
        const _currentZoom = map.getZoom();
        if (_currentZoom < 8) {
          ResetMap();
        }
      },
    });
    return null;
  }

  const MapZoomToState = ({
    lat,
    lng,
    zoom,
  }: {
    lat: number;
    lng: number;
    zoom: number;
  }) => {
    const map = useMap();
    // setCurrentZoom(zoom);
    useEffect(() => {
      map.setView([lat, lng], zoom, {
        animate: true,
      });
    }, [lat, lng, zoom, map]);
    return null;
  };

  const applyFilters = () => {
    if (
      !filterQuery.category &&
      !filterQuery.status &&
      !filterQuery.type &&
      !filterQuery.searchTerm &&
      filterQuery.ownership === "All"
    ) {
      setSortedData([]);
      return;
    }
    const data = [...allHealthCenters];
    const filtered = data.filter((center) => {
      return (
        (filterQuery.searchTerm === "" ||
          center.prmry_name
            .toLowerCase()
            .includes(filterQuery.searchTerm.toLowerCase()) ||
          center.lganame
            .toLowerCase()
            .includes(filterQuery.searchTerm.toLowerCase()) ||
          center.statename
            .toLowerCase()
            .includes(filterQuery.searchTerm.toLowerCase())) &&
        (filterQuery.ownership === "All" ||
          (filterQuery.ownership === "Public" && IsPublic(center.ownership)) ||
          (filterQuery.ownership === "Private" &&
            !IsPublic(center.ownership))) &&
        (filterQuery.category === "" ||
          filterQuery.category === center.category) &&
        (filterQuery.type === "" || filterQuery.type === center.type) &&
        (filterQuery.status === "" || filterQuery.status === center.func_stats)
      );
    });
    setSortedData(filtered);
  };

  useEffect(() => {
    GetStates(); // Fetch the states data
    if (healthCenters.length) return;
    // GetHealthCenters(); // Fetch the health centers data

    if (!statesData.length) {
      GetStates();
    }
    if (stateName === "") {
      setHealthCenters([]);
      setFilteredData([]);
    } else if (stateName) {
      setHealthCenters([]);
      setFilteredData([]);
      GetHealthCentersForState(stateName);
    }
  }, [stateName]);

  useEffect(() => {
    if (!healthCenters.length) return;
    HandleFilter();
  }, [ownership, healthCenters]);

  useEffect(() => {
    if (allHealthCenters.length) {
      applyFilters();
    } else {
      GetAllHealthCenters();
    }
  }, [filterQuery, allHealthCenters]);

  return (
    <section className="h-screen">
      <MapContainer
        center={position}
        zoom={defaultZoom}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FixedCompass zoom={defaultZoom} ResetMap={ResetMap} />
        <MapLegend statename={stateName} />
        <ZoomListener />
        {isOpen && (
          <HealthCenterSearch
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isPublic={IsPublic}
            data={sortedData}
            filterQuery={filterQuery}
            setFilterQuery={(e) => setFilterQuery(e)}
            ClearFilter={() => setSortedData([])}
          />
        )}

        {filteredData.map((center, idx) => {
          const icon = IsPublic(center.ownership)
            ? publicHealthIcon
            : privateHealthIcon;
          return (
            <Marker
              key={idx}
              position={[center.latitude, center.longitude]}
              icon={icon}
            >
              <Popup>
                <PopupContent IsPublic={IsPublic} center={center} />
              </Popup>
            </Marker>
          );
        })}

        {/* Display state markers */}
        {statesData.map((state) => (
          <Marker
            key={state.statename}
            position={[state.latitude, state.longitude]}
            icon={DefaultIcon}
          >
            {/* {!healthCenters.length && ( */}
            <Popup autoClose={true}>
              <PopupContentState
                state={state}
                SetThisState={() => handleStateClick(state)}
              />
            </Popup>
            {/* )} */}
            {/* Center the map to the clicked state's location and zoom in */}
            {stateName === state.statename && (
              <MapZoomToState
                lat={state.latitude}
                lng={state.longitude}
                zoom={12}
              />
            )}
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default HealthCentersMapView;
