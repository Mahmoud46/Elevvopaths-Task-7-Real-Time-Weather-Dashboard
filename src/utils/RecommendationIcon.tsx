import type { ReactNode } from "react";
import {
	TbSnowflake,
	TbTemperatureMinus,
	TbShirt,
	TbSun,
	TbBottle,
	TbHome,
	TbUmbrella,
	TbWind,
	TbDroplet,
	TbSunHigh,
} from "react-icons/tb";

export function getRecommendationIcon(
	tempCelsius: number,
	description: string,
	humidity: number,
	windSpeed: number,
	uvIndex: number
): ReactNode {
	const desc = description.toLowerCase();

	// 🌧 Weather-based icons (priority first)
	if (desc.includes("rain") || desc.includes("drizzle")) {
		return <TbUmbrella className="text-blue-500" />; // rainy
	}
	if (desc.includes("storm") || desc.includes("thunder")) {
		return <TbHome className="text-gray-700" />; // storm = stay indoors
	}
	if (desc.includes("wind") || windSpeed > 30) {
		return <TbWind className="text-teal-500" />; // windy
	}

	// ❄️ Temperature-based
	if (tempCelsius <= 0) {
		return <TbSnowflake className="text-sky-400" />; // freezing
	}
	if (tempCelsius > 0 && tempCelsius <= 10) {
		return <TbTemperatureMinus className="text-blue-500" />; // chilly
	}
	if (tempCelsius > 10 && tempCelsius <= 20) {
		return <TbShirt className="text-green-600" />; // cool
	}
	if (tempCelsius > 20 && tempCelsius <= 28) {
		return <TbSun className="text-yellow-500" />; // mild
	}
	if (tempCelsius > 28 && tempCelsius <= 35) {
		return <TbBottle className="text-sky-600" />; // hot - stay hydrated
	}

	// 💧 Humidity
	if (humidity > 85) {
		return <TbDroplet className="text-indigo-500" />; // very humid
	}

	// ☀️ UV Index
	if (uvIndex >= 6) {
		return <TbSunHigh className="text-orange-500" />; // high UV - sunscreen
	}

	// 🔥 Extreme fallback
	return <TbHome className="text-red-600" />; // extreme heat or unsafe
}
