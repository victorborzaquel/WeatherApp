export interface ICity {
  city: ICityResponse;
  conditions: ICurrentConditionsResponse | undefined;
  searchDate: number;
}

export interface ICityResponse {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  },
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  }
}

export interface ICurrentConditionsResponse {
  Key: string;
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: null | string;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    },
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    }
  },
  MobileLink: string;
  Link: string;
}