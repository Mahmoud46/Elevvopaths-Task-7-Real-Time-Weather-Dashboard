import { useState, type ReactNode } from "react";
import { Context } from "./Context";
import type { IContext } from "../interfaces/Context.interface";
import type { TemperatureUnit } from "../interfaces/Weather.interface";
import type Weather from "../interfaces/Weather.interface";
import type { OpenWeatherForecast } from "../interfaces/OpenWeatherMap.interface";
import type { HourInfo } from "../interfaces/WeatherForecast.interface";

export default function ContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	const [tempUnit, setTempUnit] = useState<TemperatureUnit>(
		(localStorage.getItem("preferred_temp_unit") || "C") as TemperatureUnit
	);
	const [weatherData, setWeatherData] = useState<Weather | null>(null);
	const [forecastData, setForecastData] = useState<OpenWeatherForecast | null>(
		null
	);
	const [cities, setCities] = useState<string[]>(["cairo", "london", "paris"]);
	const [showCitiesMenu, setShowCitiesMenu] = useState<boolean>(false);
	const [cityFetchError, setCityFetchError] = useState<boolean>(false);
	const [weatherTrend, setWeatherTrend] = useState<HourInfo[]>([]);
	const [hourlyWeather, setHourlyWeather] = useState<HourInfo[]>([]);

	const toggleUnit = () => {
		const newTempUnit = tempUnit == "C" ? "F" : "C";
		setTempUnit(newTempUnit);
		localStorage.setItem("preferred_temp_unit", newTempUnit);
	};

	const value: IContext = {
		cities,
		setCities,
		tempUnit,
		setTempUnit,
		weatherData,
		setWeatherData,
		toggleUnit,
		forecastData,
		setForecastData,
		showCitiesMenu,
		setShowCitiesMenu,
		cityFetchError,
		setCityFetchError,
		weatherTrend,
		setWeatherTrend,
		hourlyWeather,
		setHourlyWeather,
	};
	return <Context.Provider value={value}>{children}</Context.Provider>;
}
