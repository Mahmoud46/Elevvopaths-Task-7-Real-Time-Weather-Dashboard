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

export default function Dashboard(): ReactNode {
	const { city } = useParams();
	const { setCities, setWeatherData } = useContext(Context) as IContext;

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["city", city],
		queryFn: () => fetchWeather(city as string),
		enabled: !!city,
	});

	useEffect(() => {
		if (city && data) {
			setWeatherData(data);
			setCities((prev) => [
				...new Set([data?.location.name.toLowerCase(), ...prev]),
			]);
		}
	}, [city, data, setCities, setWeatherData]);

	if (isLoading)
		return (
			<div className="absolute top-[50%] left-[50%] translate-[-50%] glass rounded-full">
				<img src={loadingIcon} className="size-[100px]" />
			</div>
		);
	if (isError) return <p>Error: {error.message}</p>;

	return (
		<section className="flex flex-col gap-4 text-white px-2 sm:px-8 ">
			<div className="flex w-full gap-4 flex-wrap">
				<Current />

				{/*  */}
				<MapFrame />
			</div>

			{/*  */}
			<Forecast />
		</section>
	);
}
