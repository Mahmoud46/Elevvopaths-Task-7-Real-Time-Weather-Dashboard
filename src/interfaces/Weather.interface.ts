import type { ReactElement } from "react";
import type { WeatherForecast } from "./WeatherForecast.interface";

export default interface Weather {
	location: Location;
	current: CurrentWeather;
	forecast: Forecast;
}

interface Forecast {
	forecastday: WeatherForecast[];
}

interface Location {
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	tz_id: string;
	localtime_epoch: number;
	localtime: string;
}

interface WeatherCondition {
	text: string;
	icon: string;
	code: number;
}

interface CurrentWeather {
	last_updated_epoch: number;
	last_updated: string;
	temp_c: number;
	temp_f: number;
	is_day: number;
	condition: WeatherCondition;
	wind_mph: number;
	wind_kph: number;
	wind_degree: number;
	wind_dir: string;
	pressure_mb: number;
	pressure_in: number;
	precip_mm: number;
	precip_in: number;
	humidity: number;
	cloud: number;
	feelslike_c: number;
	feelslike_f: number;
	windchill_c: number;
	windchill_f: number;
	heatindex_c: number;
	heatindex_f: number;
	dewpoint_c: number;
	dewpoint_f: number;
	vis_km: number;
	vis_miles: number;
	uv: number;
	gust_mph: number;
	gust_kph: number;
}

export interface WeatherAlert {
	icon: ReactElement;
	title: string;
	message: string;
}

export type TemperatureUnit = "F" | "C";
export type ComfortLevel =
	| "Unknown"
	| "Uncomfortable"
	| "Moderate"
	| "Comfortable"
	| "Cold";

type Trend = "stable" | "falling" | "rising";

export interface ChangeTrend {
	value: number;
	trend: Trend;
}
