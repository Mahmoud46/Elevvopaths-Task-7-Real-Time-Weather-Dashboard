import { useContext, useEffect, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { fetchWeather } from "../utils/FetchWather";
import { useQuery } from "@tanstack/react-query";
import loadingIcon from "../assets/spinning-dots.svg";
import Forecast from "../components/Forecast";
import MapFrame from "../components/Map";
import Current from "../components/Current";
import { BiError } from "react-icons/bi";
import { getPastHours, getWeatherTrendToday } from "../utils/Analytics";
import Analytics from "../components/Analytics";
import WeatherRecommendation from "../components/WeatherRecommendation";
import GraphContainer from "../components/GraphContainer";
import HourlyForecast from "../components/HourlyForecast";

export default function Dashboard(): ReactNode {
	const { city } = useParams();
	const {
		setCities,
		setWeatherData,
		setCityFetchError,
		setHourlyWeather,
		setWeatherTrend,
	} = useContext(Context) as IContext;

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["city", city],
		queryFn: () => fetchWeather(city as string),
		enabled: !!city,
	});

	useEffect(() => {
		if (city && data) {
			setCityFetchError(false);
			setWeatherData(data);
			setCities((prev) => [
				...new Set([data?.location.name.toLowerCase(), ...prev]),
			]);
			setHourlyWeather(getPastHours(data, 10));
			setWeatherTrend(getWeatherTrendToday(data, 10));
		}
	}, [
		city,
		data,
		setCities,
		setWeatherData,
		setCityFetchError,
		setHourlyWeather,
		setWeatherTrend,
	]);

	if (isLoading)
		return (
			<div className="absolute top-[50%] left-[50%] translate-[-50%] glass rounded-full">
				<img src={loadingIcon} className="size-[70px]" />
			</div>
		);
	if (isError) {
		setCityFetchError(true);
		return (
			<div className="absolute top-[50%] left-[50%] translate-[-50%] glass p-4 flex flex-col gap-1 justify-center items-center rounded-2xl">
				<BiError className="text-5xl" />
				<p
					className="text-sm text-center"
					dangerouslySetInnerHTML={{ __html: error.message }}
				></p>
			</div>
		);
	}

	return (
		<>
			<div className="sticky top-[-20dvh] sm:top-0 flex flex-col gap-4">
				<div className="flex w-full gap-4 flex-wrap">
					<Current />

					{/*  */}
					<MapFrame className="hidden sm:flex-1 sm:flex sm:aspect-[16/8]" />
				</div>

				{/*  */}
				<Forecast />
			</div>
			{
				<div className="glass-mod flex flex-wrap w-full rounded-2xl p-4 gap-4">
					<MapFrame className="flex flex-1 aspect-[16/8] sm:hidden" />
					<div className="flex-1 flex flex-col gap-2 w-full sm:w-[350px]">
						<div className="relative min-w-[300px] aspect-[16/9] sm:aspect-[16/8] glass-mod rounded-2xl overflow-hidden">
							<GraphContainer graphStatus="past" />
						</div>
						<HourlyForecast forecastStatus="past" />
					</div>

					<div className="flex-1 flex flex-col gap-2 w-full sm:w-[350px]">
						<div className="relative min-w-[300px] aspect-[16/9] sm:aspect-[16/8] glass-mod rounded-2xl overflow-hidden">
							<GraphContainer graphStatus="next" />
						</div>
						<HourlyForecast forecastStatus="next" />
					</div>

					<div className="flex flex-col gap-2 w-full sm:w-[350px]">
						<Analytics />
						<WeatherRecommendation />
					</div>
				</div>
			}
		</>
	);
}
