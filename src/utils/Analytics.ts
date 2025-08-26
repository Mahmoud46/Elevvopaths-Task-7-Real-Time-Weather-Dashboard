import type {
	ChangeTrend,
	TemperatureUnit,
} from "../interfaces/Weather.interface";
import type Weather from "../interfaces/Weather.interface";
import type { HourInfo } from "../interfaces/WeatherForecast.interface";

export const calculateTempChange = (
	hourlyWeather: HourInfo[],
	tempUnit: "C" | "F"
): ChangeTrend => {
	if (hourlyWeather?.length < 2) return { value: 0, trend: "stable" };

	const oldestTemp: number =
		tempUnit == "C" ? hourlyWeather[0]?.temp_c : hourlyWeather[0]?.temp_f;

	const newestTemp: number =
		tempUnit == "C"
			? hourlyWeather[hourlyWeather.length - 1]?.temp_c
			: hourlyWeather[hourlyWeather.length - 1]?.temp_f;

	const difference: number = newestTemp - oldestTemp;

	return {
		value: +Math.abs(difference).toFixed(1),
		trend: difference > 0 ? "rising" : difference < 0 ? "falling" : "stable",
	};
};

export const calculateUpcomingTrend = (
	weatherTrend: HourInfo[],
	tempUnit: TemperatureUnit
): ChangeTrend => {
	if (weatherTrend?.length < 2) return { value: 0, trend: "stable" };
	const firstTemp: number =
		tempUnit == "C" ? weatherTrend[0]?.temp_c : weatherTrend[0]?.temp_f;

	const lastTemp: number =
		tempUnit == "C"
			? weatherTrend[weatherTrend.length - 1]?.temp_c
			: weatherTrend[weatherTrend.length - 1]?.temp_f;

	const difference: number = lastTemp - firstTemp;

	return {
		value: +Math.abs(difference).toFixed(1),
		trend: difference > 0 ? "rising" : difference < 0 ? "falling" : "stable",
	};
};

export function calculateComfortLevel(weatherData: Weather) {
	// convert Celsius to Fahrenheit for Heat Index formula
	const tempF = (weatherData.current.temp_c * 9) / 5 + 32;

	// Heat Index formula (approximation)
	const HI =
		-42.379 +
		2.04901523 * tempF +
		10.14333127 * weatherData.current.humidity -
		0.22475541 * tempF * weatherData.current.humidity -
		0.00683783 * tempF * tempF -
		0.05481717 * weatherData.current.humidity * weatherData.current.humidity +
		0.00122874 * tempF * tempF * weatherData.current.humidity +
		0.00085282 *
			tempF *
			weatherData.current.humidity *
			weatherData.current.humidity -
		0.00000199 *
			tempF *
			tempF *
			weatherData.current.humidity *
			weatherData.current.humidity;

	// convert back to Celsius
	const hiC = ((HI - 32) * 5) / 9;

	// classify comfort level
	if (hiC < 15) return "Cold";
	if (hiC >= 15 && hiC < 25) return "Comfortable";
	if (hiC >= 25 && hiC < 32) return "Warm";
	if (hiC >= 32 && hiC < 40) return "Hot";
	return "Very Hot / Dangerous";
}

export const getPastHours = (weatherData: Weather, HOURS_BACK: number) => {
	const currentHour = new Date(weatherData.location.localtime).getHours();
	const forecastToday: HourInfo[] = weatherData.forecast.forecastday[0].hour
		.filter((hour) => {
			const forecastHour = new Date(hour.time).getHours();
			return (
				forecastHour > currentHour - HOURS_BACK && forecastHour <= currentHour
			);
		})
		.map((hour) => ({
			...hour,
			time: new Date(hour.time).toLocaleTimeString("en-US", {
				hour: "numeric",
				hour12: true,
			}),
		}));

	return forecastToday;
};

export const getWeatherTrendToday = (
	weatherData: Weather,
	HOURS_BACK: number
) => {
	const currentHour = new Date(weatherData.location.localtime).getHours();
	const weatherTrendToday = weatherData.forecast.forecastday[0].hour
		.filter((hours) => {
			const hour = new Date(hours.time).getHours();
			return hour > currentHour && hour <= currentHour + HOURS_BACK;
		})
		.map((hour) => ({
			...hour,
			time: new Date(hour.time).toLocaleTimeString("en-US", {
				hour: "numeric",
				hour12: true,
			}),
		}));

	return weatherTrendToday;
};
