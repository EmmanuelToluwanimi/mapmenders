export interface HealthCenter {
  FID: number;
  FID_1: number;
  globalid: string;
  uniq_id: number;
  timestamp: string;
  editor: string;
  latitude: number;
  longitude: number;
  wardname: string;
  wardcode: string;
  lganame: string;
  lgacode: string;
  statename: string;
  statecode: string;
  updated_on: string;
  accessblty: string;
  func_stats: string;
  category: string;
  ownership: string;
  type: string;
  source: string;
  alt_name?: string;
  prmry_name: string;
}

export interface StateData {
  latitude: number;
  longitude: number;
  statename: string;
  Capital: string;
  No_of_LGA: number;
  No_of_Primary: number;
  No_of_Secondary: number;
  No_of_Tertiary: number;
  Total: number;
}

export interface IHealthCenters {
  latitude:   number;
  longitude:  number;
  wardname:   string;
  wardcode:   string;
  lganame:    string;
  lgacode:    number;
  statename:  string;
  func_stats: string;
  category:   string;
  ownership:  string;
  type:       string;
  prmry_name: string;
}
