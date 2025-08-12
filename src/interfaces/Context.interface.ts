import type { OpenWeatherForecast } from "./OpenWeatherMap.interface";
import type Weather from "./Weather.interface";
import type { TemperatureUnit } from "./Weather.interface";

export interface IContext {
	cities: string[];
	tempUnit: TemperatureUnit;
	weatherData: Weather | null;
	setCities: React.Dispatch<React.SetStateAction<string[]>>;
	setTempUnit: React.Dispatch<React.SetStateAction<TemperatureUnit>>;
	setWeatherData: React.Dispatch<React.SetStateAction<Weather | null>>;
	toggleUnit: () => void;
	forecastData: OpenWeatherForecast | null;
	setForecastData: React.Dispatch<
		React.SetStateAction<OpenWeatherForecast | null>
	>;
}
