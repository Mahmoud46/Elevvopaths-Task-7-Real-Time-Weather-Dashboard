import { useContext, useEffect } from "react";
import type { IContext } from "../interfaces/Context.interface";
import { Context } from "../context/Context";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatheForecast } from "../utils/FetchWather";
import loadingIcon from "../assets/spinning-dots.svg";
import { BiError } from "react-icons/bi";
import { WeatherIcon } from "../utils/WeatherIcon";

export default function Forecast() {
	const { weatherData, forecastData, setForecastData, tempUnit } = useContext(
		Context
	) as IContext;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["city", weatherData?.location.name],
		queryFn: () => fetchWeatheForecast(weatherData?.location.name as string),
		enabled: !!weatherData?.location.name,
	});

	useEffect(() => {
		if (data) {
			setForecastData(data);
		}
	}, [data, setForecastData]);

	if (isLoading)
		return (
			<div className="flex items-center justify-center py-8">
				<div className="glass rounded-full w-fit">
					<img src={loadingIcon} className="size-[70px]" />
				</div>
			</div>
		);
	if (isError)
		return (
			<div className="flex items-center justify-center py-8">
				<div className="glass p-4 flex flex-col gap-1 justify-center items-center rounded-2xl">
					<BiError className="text-5xl" />
					<p className="text-sm">Hmm... we couldn’t find that city. </p>
					<p className="text-sm">
						Double-check the spelling or try a nearby location.
					</p>
				</div>
			</div>
		);
	return (
		<>
			{forecastData && (
				<div className="flex w-full overflow-auto glass p-4 rounded-4xl gap-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					{forecastData.list?.map((hr, i) => (
						<div
							key={i}
							className="glass p-2 rounded-3xl overflow-hidden flex-none justify-center text-center w-[80px]"
						>
							<h1 className="">
								{hr.dt_txt.includes(
									weatherData?.location.localtime.split(" ")[0] as string
								)
									? "Today"
									: new Date(
											((hr.dt as number) * 1000) as number
									  ).toLocaleDateString("en-US", { weekday: "short" })}
							</h1>
							<p className="text-sm glass rounded-full overflow-hidden opacity-75">
								{new Date(
									((hr.dt as number) * 1000) as number
								).toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "2-digit",
									hour12: true,
								})}
							</p>

							<div className="flex flex-col justify-center items-center">
								<div>
									<WeatherIcon
										description={hr.weather[0].main}
										time={hr.dt}
										sunrise={weatherData?.forecast.forecastday[0].astro.sunrise}
										sunset={weatherData?.forecast.forecastday[0].astro.sunset}
										className="text-[50px] pt-1"
									/>
									<p className="font-semibold">
										{tempUnit == "C"
											? hr.main.temp
											: ((hr.main.temp * 9) / 5 + 32).toFixed(1)}
										&deg;{tempUnit}
									</p>
									<p className="text-sm">{hr.weather[0].main}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}
