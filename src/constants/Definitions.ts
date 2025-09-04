import type { IconType } from "react-icons";
import {
	WiBarometer,
	WiCloud,
	WiCloudyGusts,
	WiFog,
	WiRaindrop,
	WiShowers,
	WiSnowflakeCold,
	WiThermometer,
} from "react-icons/wi";
import type { IWeatherMapLayer } from "../interfaces/OpenWeatherMap.interface";

export const weatherDefinitions: {
	title: string;
	definition: string;
	meaning: string;
	icon: IconType;
	color: string;
}[] = [
	{
		title: "Wind Gust Speed",
		definition:
			"The peak wind speed measured in short bursts, stronger than the sustained wind.",
		meaning:
			"Indicates sudden, brief increases in wind that can affect comfort, safety, and outdoor activities.",
		icon: WiCloudyGusts,
		color: "text-sky-500", // airy, wind/sky
	},
	{
		title: "Dew Point",
		definition:
			"The temperature at which air becomes fully saturated with moisture.",
		meaning:
			"A higher dew point means the air feels more humid, while a lower dew point means it feels drier.",
		icon: WiRaindrop,
		color: "text-cyan-500", // water/moisture
	},
	{
		title: "Visibility",
		definition:
			"The maximum distance one can clearly see objects in the atmosphere.",
		meaning:
			"Reduced visibility (due to fog, rain, or snow) can impact travel safety and outdoor conditions.",
		icon: WiFog,
		color: "text-gray-400", // fog/mist
	},
	{
		title: "Wind Chill Temperature",
		definition:
			"The perceived temperature when wind is factored into the actual air temperature.",
		meaning:
			"Strong winds make it feel colder than the thermometer reading, affecting comfort and frostbite risk.",
		icon: WiSnowflakeCold,
		color: "text-blue-400", // icy cold
	},
];

export const mapActionButtons: {
	title: string;
	icon: IconType;
	cat: IWeatherMapLayer;
}[] = [
	{ title: "Wind", icon: WiCloudyGusts, cat: "wind_new" },
	{ title: "Clouds", icon: WiCloud, cat: "clouds_new" },
	{ title: "Precipitation", icon: WiShowers, cat: "precipitation_new" },
	{ title: "Pressure", icon: WiBarometer, cat: "pressure_new" },
	{ title: "Temperature", icon: WiThermometer, cat: "temp_new" },
];
