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

export default function Current(): ReactNode {
	const { weatherData, toggleUnit, tempUnit } = useContext(Context) as IContext;
	return (
		<>
			{weatherData && (
				<div className="flex glass p-4 rounded-2xl gap-4 flex-1 sm:aspect-[16/9] flex-col sm:flex-row ">
					{/* Left */}
					<div className="flex flex-col items-center justify-between sm:items-start sm:flex-1">
						<div className="flex glass rounded-full items-center gap-2 py-1 px-2 w-fit text-sm">
							<GoLocation />
							<p>
								{weatherData?.location.name ?? "_"},{" "}
								{weatherData?.location.country ?? "_"}
							</p>
						</div>

						<div className="flex flex-col items-center gap-4 sm:gap-0 sm:items-start">
							<p className="text-2xl sm:text-lg">
								{new Date(
									(weatherData?.location.localtime_epoch * 1000) as number
								).toLocaleDateString("en-US", { weekday: "long" })}
							</p>
							<div className="flex sm:hidden">
								<img
									src={weatherData?.current.condition.icon}
									className="size-[100px]"
								/>
							</div>
							<h1 className="text-3xl">
								{weatherData?.current.condition.text ?? "weather unavailable"}
							</h1>
							<p className="font-cabinet text-sm">
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

						<div className="">
							<p
								className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-cabinet cursor-pointer"
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
					<div className="flex flex-col sm:flex-1">
						<div className="hidden sm:flex justify-center">
							<img
								src={weatherData?.current.condition.icon}
								className="size-[100px]"
							/>
						</div>
						<div className="flex justify-center">
							<div className="flex items-center gap-2 p-4 ">
								<LuDroplets size={20} className="text-blue-400" />
								<div>
									<p className="text-sm opacity-70">Humidity</p>
									<p className="font-medium">
										{weatherData?.current.humidity ?? "__"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 p-4 ">
								<LuWind size={20} className="text-gray-400" />
								<div>
									<p className="text-sm opacity-70">Wind</p>
									<p className="font-medium">
										{weatherData?.current.wind_kph ?? "__"}
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
