import { LatLngExpression } from "leaflet";

export const Assets = {
  naijaFlagIcon: "/assets/flag.svg",
  greenIcon: "/assets/green.svg",
  redIcon: "/assets/red.svg",
  arrowUp: "/assets/arrow_up.svg",
  chevronupIcon: "/assets/chevron_up.svg",
  chevrondownIcon: "/assets/chevron_down.svg",
  leftchevron: "/assets/leftchevron.svg",
  locationIcon: "/assets/location.svg",
  plusIcon: "/assets/plus.svg",
  searchIcon: "/assets/search.svg",
  markerIcon: "/assets/marker.svg",
  minusIcon: "/assets/minus.svg",
  mapIcon: "/assets/map.svg",
  closeIcon: "/assets/close.svg",
  resetIcon: "/assets/reseticon.svg",
  red2Icon: "/assets/red2.svg",
  green2Icon: "/assets/green2.svg",
  heatmap: "/assets/heatmap.png",
  welcome: "/assets/welcome2.png",
};

export const Colors = {
  primary: "#036EFF",
};

export const selectedState = "nga";
export const position = [9.0820, 8.6753] as LatLngExpression;
export const defaultZoom = 6;

// Define color scales based on density
export const getColor = (density: number) => {
  return density > 150
    ? "#800026"
    : density > 100
    ? "#BD0026"
    : density > 50
    ? "#E31A1C"
    : density > 20
    ? "#FC4E2A"
    : density > 10
    ? "#FD8D3C"
    : "#FFEDA0";
};

export const healthCenterDensity: Record<string, number> = {
  "Abia": Math.floor(Math.random() * 191) + 10,
  "Adamawa": Math.floor(Math.random() * 191) + 10,
  "Akwa Ibom": Math.floor(Math.random() * 191) + 10,
  "Anambra": Math.floor(Math.random() * 191) + 10,
  "Bauchi": Math.floor(Math.random() * 191) + 10,
  "Bayelsa": Math.floor(Math.random() * 191) + 10,
  "Benue": Math.floor(Math.random() * 191) + 10,
  "Borno": Math.floor(Math.random() * 191) + 10,
  "Cross River": Math.floor(Math.random() * 191) + 10,
  "Delta": Math.floor(Math.random() * 191) + 10,
  "Ebonyi": Math.floor(Math.random() * 191) + 10,
  "Edo": Math.floor(Math.random() * 191) + 10,
  "Ekiti": Math.floor(Math.random() * 191) + 10,
  "Enugu": Math.floor(Math.random() * 191) + 10,
  "Gombe": Math.floor(Math.random() * 191) + 10,
  "Imo": Math.floor(Math.random() * 191) + 10,
  "Jigawa": Math.floor(Math.random() * 191) + 10,
  "Kaduna": Math.floor(Math.random() * 191) + 10,
  "Kano": Math.floor(Math.random() * 191) + 10,
  "Katsina": Math.floor(Math.random() * 191) + 10,
  "Kebbi": Math.floor(Math.random() * 191) + 10,
  "Kogi": Math.floor(Math.random() * 191) + 10,
  "Kwara": Math.floor(Math.random() * 191) + 10,
  "Lagos": Math.floor(Math.random() * 191) + 10,
  "Nasarawa": Math.floor(Math.random() * 191) + 10,
  "Niger": Math.floor(Math.random() * 191) + 10,
  "Ogun": Math.floor(Math.random() * 191) + 10,
  "Ondo": Math.floor(Math.random() * 191) + 10,
  "Osun": Math.floor(Math.random() * 191) + 10,
  "Oyo": Math.floor(Math.random() * 191) + 10,
  "Plateau": Math.floor(Math.random() * 191) + 10,
  "Rivers": Math.floor(Math.random() * 191) + 10,
  "Sokoto": Math.floor(Math.random() * 191) + 10,
  "Taraba": Math.floor(Math.random() * 191) + 10,
  "Yobe": Math.floor(Math.random() * 191) + 10,
  "Zamfara": Math.floor(Math.random() * 191) + 10,
  "Federal Capital Territory": Math.floor(Math.random() * 191) + 10
};
