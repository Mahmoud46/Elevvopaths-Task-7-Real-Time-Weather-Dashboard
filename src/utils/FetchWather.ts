import { BASE_URL, API_Key, OPEN_API_Key } from "../constants/APIConstants";
import type { OpenWeatherForecast } from "../interfaces/OpenWeatherMap.interface";
import type Weather from "../interfaces/Weather.interface";

export const fetchWeather = async (query: string): Promise<Weather> => {
	const response = await fetch(
		`${BASE_URL}?key=${API_Key}&days=2&q=${query}&alert=no&aqi=no`
	);

	if (!response.ok) throw new Error("Failed to fetch weather data");
	return response.json();
};

export const fetchWeatheForecast = async (
	query: string
): Promise<OpenWeatherForecast> => {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${OPEN_API_Key}&units=metric`
	);
	if (!response.ok) throw new Error("Failed to fetch weather data");
	return response.json();
};
