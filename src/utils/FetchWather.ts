import { BASE_URL, API_Key, OPEN_API_Key } from "../constants/APIConstants";
import type { OpenWeatherForecast } from "../interfaces/OpenWeatherMap.interface";
import type Weather from "../interfaces/Weather.interface";
import { latLonToTile } from "./Parse";

const statusMessages: Record<number, string> = {
	400: "Hmm... we couldn’t find that city. <br/> Double-check the spelling or try a nearby location.",
	401: "Oops! Looks like your API key or login details aren’t valid.",
	403: "Sorry, you don’t have permission to access this data.",
	404: "Hmm... we couldn’t find that city. <br/> Double-check the spelling or try a nearby location.",
	429: "Whoa, too many requests! Give it a moment and try again.",
	500: "Yikes, something went wrong on the server. <br/> Try again in a bit.",
	502: "Bad gateway. <br/> The server got a weird response. Try again soon.",
	503: "The service is taking a break. <br/> Please try again later.",
	504: "The server took too long to respond. Maybe check back in a moment.",
};

export const fetchWeather = async (query: string): Promise<Weather> => {
	const response = await fetch(
		`${BASE_URL}?key=${API_Key}&days=2&q=${query}&alert=no&aqi=no`
	);

	if (!response.ok) throw new Error(statusMessages[response.status]);
	return response.json();
};

export const fetchWeatheForecast = async (
	query: string
): Promise<OpenWeatherForecast> => {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${OPEN_API_Key}&units=metric`
	);
	if (!response.ok) throw new Error(statusMessages[response.status]);
	return response.json();
};

export const fetchWeatherMap = async (
	lat: number,
	lon: number,
	zoom: number,
	layer = "temp_new"
) => {
	const position = latLonToTile(lat, lon, zoom);
	const response = await fetch(
		`https://tile.openweathermap.org/map/${layer}/${zoom}/${position.x}/${position.y}.png?appid=${OPEN_API_Key}`
	);
	if (!response.ok) throw new Error(statusMessages[response.status]);
	return response.json();
};
