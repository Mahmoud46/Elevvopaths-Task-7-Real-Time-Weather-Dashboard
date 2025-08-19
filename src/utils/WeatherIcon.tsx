import type { ReactNode } from "react";
import {
	WiDaySunny,
	WiNightClear,
	WiDayCloudy,
	WiNightAltCloudy,
	WiCloud,
	WiDayRain,
	WiNightAltRain,
	WiSnow,
	WiThunderstorm,
	WiFog,
} from "react-icons/wi";
import { parseDateTime, parseTimeForDate } from "./Parse";

type WeatherIconProps = {
	description: string;
	time: number | string; // can be unix or datetime string
	sunrise?: string; // HH:MM AM/PM
	sunset?: string; // HH:MM AM/PM
	className?: string;
};

export function WeatherIcon({
	description,
	time,
	sunrise,
	sunset,
	className,
}: WeatherIconProps): ReactNode {
	// normalize input
	const desc = description.toLowerCase().trim();

	const timeDate = parseDateTime(time);

	const sunriseDate = sunrise ? parseTimeForDate(timeDate, sunrise) : undefined;
	const sunsetDate = sunset ? parseTimeForDate(timeDate, sunset) : undefined;

	const isDay =
		sunriseDate && sunsetDate
			? timeDate >= sunriseDate && timeDate < sunsetDate
			: true;

	// ---- CLEAR / SUNNY ----
	if (desc.includes("clear") || desc.includes("sun")) {
		return isDay ? (
			<WiDaySunny className={className} />
		) : (
			<WiNightClear className={className} />
		);
	}

	// ---- CLOUDS ----
	if (
		desc.includes("cloud") ||
		desc.includes("overcast") ||
		desc.includes("scattered clouds") ||
		desc.includes("few clouds")
	) {
		return isDay ? (
			<WiDayCloudy className={className} />
		) : (
			<WiNightAltCloudy className={className} />
		);
	}

	// ---- RAIN / DRIZZLE ----
	if (
		desc.includes("rain") ||
		desc.includes("drizzle") ||
		desc.includes("shower") ||
		desc.includes("wet")
	) {
		return isDay ? (
			<WiDayRain className={className} />
		) : (
			<WiNightAltRain className={className} />
		);
	}

	// ---- SNOW / SLEET / ICE ----
	if (
		desc.includes("snow") ||
		desc.includes("sleet") ||
		desc.includes("blizzard") ||
		desc.includes("ice")
	) {
		return <WiSnow className={className} />;
	}

	// ---- THUNDER / STORM ----
	if (
		desc.includes("thunder") ||
		desc.includes("storm") ||
		desc.includes("lightning") ||
		desc.includes("tstorm")
	) {
		return <WiThunderstorm className={className} />;
	}

	// ---- FOG / MIST / HAZE / SMOKE / DUST ----
	if (
		desc.includes("fog") ||
		desc.includes("mist") ||
		desc.includes("haze") ||
		desc.includes("smoke") ||
		desc.includes("dust")
	) {
		return <WiFog className={className} />;
	}

	// ---- FALLBACK ----
	return <WiCloud className={className} />;
}
