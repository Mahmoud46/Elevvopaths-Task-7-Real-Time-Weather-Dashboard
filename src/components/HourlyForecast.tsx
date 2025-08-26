import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { WeatherIcon } from "../utils/WeatherIcon";

export default function HourlyForecast({
	forecastStatus,
}: {
	forecastStatus: "next" | "past";
}): ReactNode {
	const { hourlyWeather, weatherData, tempUnit, weatherTrend } = useContext(
		Context
	) as IContext;

	return (
		<>
			{forecastStatus == "past" && hourlyWeather && (
				<div className="flex overflow-auto gap-2 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					{hourlyWeather.map((hour, i) => (
						<div
							key={i}
							className="flex-none glass p-2 rounded-2xl overflow-clip w-[65px]"
						>
							<p className="glass text-xs text-center rounded-full mb-1">
								{hour.time}
							</p>
							<WeatherIcon
								description={JSON.stringify(hour.condition.text)}
								time={hour.time_epoch}
								sunrise={weatherData?.forecast.forecastday[0].astro.sunrise}
								sunset={weatherData?.forecast.forecastday[0].astro.sunset}
								className="text-[45px]"
							/>
							<div className="text-center">
								{tempUnit == "C" ? hour.temp_c ?? "__" : hour.temp_f ?? "__"}
								<span>&deg;{tempUnit}</span>
							</div>
						</div>
					))}
				</div>
			)}
			{forecastStatus == "next" && weatherTrend && (
				<div className="flex overflow-auto gap-2 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					{weatherTrend.map((hour, i) => (
						<div
							key={i}
							className="flex-none glass p-2 rounded-2xl overflow-clip w-[65px]"
						>
							<p className="glass text-xs text-center rounded-full mb-1">
								{hour.time}
							</p>
							<WeatherIcon
								description={JSON.stringify(hour.condition.text)}
								time={hour.time_epoch}
								sunrise={weatherData?.forecast.forecastday[0].astro.sunrise}
								sunset={weatherData?.forecast.forecastday[0].astro.sunset}
								className="text-[45px]"
							/>
							<div className="text-center">
								{tempUnit == "C" ? hour.temp_c ?? "__" : hour.temp_f ?? "__"}
								<span>&deg;{tempUnit}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}
