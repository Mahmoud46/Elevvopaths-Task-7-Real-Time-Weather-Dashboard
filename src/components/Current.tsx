import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { GoLocation } from "react-icons/go";
import {
	LuDroplets,
	LuThermometerSnowflake,
	LuThermometerSun,
	LuWind,
} from "react-icons/lu";
import { WeatherIcon } from "../utils/WeatherIcon";
import { WiSunrise, WiSunset } from "react-icons/wi";

export default function Current(): ReactNode {
	const { weatherData, toggleUnit, tempUnit } = useContext(Context) as IContext;
	return (
		<>
			{weatherData && (
				<div className="flex glass p-4 rounded-2xl gap-4 flex-1 lg:aspect-[16/8] flex-col lg:flex-row">
					{/* Left */}
					<div className="flex flex-col items-center justify-between lg:items-start lg:flex-1">
						<div className="flex glass rounded-full items-center gap-2 py-1 px-2 w-fit text-sm">
							<GoLocation />
							<p>
								{weatherData?.location.name ?? "_"},{" "}
								{weatherData?.location.country ?? "_"}
							</p>
						</div>

						<div className="flex flex-col items-center gap-2 lg:gap-0 lg:items-start">
							<p className="text-center mt-2 text-2xl lg:text-lg lg:text-left lg:mt-0">
								{new Date(
									(weatherData?.location.localtime_epoch * 1000) as number
								).toLocaleDateString("en-US", { weekday: "long" })}
							</p>
							<p className="font-cabinet text-sm sm:hidden flex">
								{new Date(
									weatherData?.location.localtime as string
								).toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "numeric",
									hour12: true,
								})}{" "}
								&bull;{" "}
								{new Date(
									weatherData?.location.localtime as string
								).toLocaleDateString("en-US", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</p>
							<div className="flex lg:hidden">
								<WeatherIcon
									description={weatherData?.current.condition.text}
									time={weatherData?.location.localtime}
									sunrise={weatherData?.forecast.forecastday[0].astro.sunrise}
									sunset={weatherData?.forecast.forecastday[0].astro.sunset}
									className="text-[150px]"
								/>
							</div>
							<h1 className="text-4xl">
								{weatherData?.current.condition.text ?? "weather unavailable"}
							</h1>
							<p className="font-cabinet text-sm sm:flex hidden">
								{new Date(
									weatherData?.location.localtime as string
								).toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "numeric",
									hour12: true,
								})}{" "}
								&bull;{" "}
								{new Date(
									weatherData?.location.localtime as string
								).toLocaleDateString("en-US", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</p>
						</div>

						<div className="flex flex-col gap-2">
							<p
								className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-cabinet cursor-pointer mt-2 lg:mt-0"
								onClick={toggleUnit}
							>
								{tempUnit == "C"
									? weatherData?.current.temp_c ?? "__"
									: weatherData?.current.temp_f ?? "__"}
								<span>&deg;{tempUnit}</span>
							</p>

							<div className="flex gap-4">
								<p className="flex items-center gap-1">
									<LuThermometerSun color="red" size={20} opacity="70%" />
									{tempUnit == "C"
										? weatherData?.forecast.forecastday[0].day.maxtemp_c ?? "__"
										: weatherData?.forecast.forecastday[0].day.maxtemp_f ??
										  "__"}
								</p>
								<p className="flex items-center gap-1">
									<LuThermometerSnowflake
										color="skyblue"
										size={20}
										opacity="70%"
									/>
									{tempUnit == "C"
										? weatherData?.forecast.forecastday[0].day.mintemp_c ?? "__"
										: weatherData?.forecast.forecastday[0].day.mintemp_f ??
										  "__"}
								</p>
							</div>
						</div>
					</div>
					{/* Right */}
					<div className="flex flex-col xl:flex-1">
						<div className="flex justify-center">
							<div className="flex items-center gap-2 p-2 ">
								<WiSunrise size={30} className="text-orange-300" />
								<div>
									<p className="text-xs xl:text-sm opacity-70">Sunrise</p>
									<p className="text-sm xl:text-lg font-medium">
										{weatherData?.forecast.forecastday[0].astro.sunrise ??
											"__:__ __"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 p-2 ">
								<WiSunset size={30} className="text-red-500" />
								<div>
									<p className="text-xs xl:text-sm opacity-70">Sunset</p>
									<p className="text-sm xl:text-lg font-medium">
										{weatherData?.forecast.forecastday[0].astro.sunset ??
											"__:__ __"}
									</p>
								</div>
							</div>
						</div>
						<div className="hidden lg:flex justify-center">
							<WeatherIcon
								description={weatherData?.current.condition.text}
								time={weatherData?.location.localtime}
								sunrise={weatherData?.forecast.forecastday[0].astro.sunrise}
								sunset={weatherData?.forecast.forecastday[0].astro.sunset}
								className="text-[110px] xl:text-[150px]"
							/>
						</div>

						<div className="flex justify-center">
							<div className="flex items-center gap-2 p-4 ">
								<LuDroplets size={20} className="text-blue-400" />
								<div>
									<p className="text-xs xl:text-sm opacity-70">Humidity</p>
									<p className="text-sm xl:text-lg font-medium">
										{weatherData?.current.humidity ?? "__"}
										<span className="text-xs font-normal">%</span>
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 p-4 ">
								<LuWind size={20} className="text-gray-400" />
								<div>
									<p className="text-xs xl:text-sm opacity-70">Wind</p>
									<p className="text-sm xl:text-lg font-medium">
										{weatherData?.current.wind_kph ?? "__"}
										<span className="text-xs font-normal">km/h</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
