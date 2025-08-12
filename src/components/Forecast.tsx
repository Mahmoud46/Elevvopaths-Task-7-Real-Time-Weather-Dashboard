import { useContext, useEffect } from "react";
import type { IContext } from "../interfaces/Context.interface";
import { Context } from "../context/Context";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatheForecast } from "../utils/FetchWather";
import loadingIcon from "../assets/spinning-dots.svg";

export default function Forecast() {
	const { weatherData, forecastData, setForecastData, tempUnit } = useContext(
		Context
	) as IContext;

	const { data, isLoading, isError, error } = useQuery({
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
					<img src={loadingIcon} className="size-[100px]" />
				</div>
			</div>
		);
	if (isError) return <p>Error: {error.message}</p>;
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
									<img
										src={`https://openweathermap.org/img/wn/${hr.weather[0].icon}@2x.png`}
										alt=""
										className="size-[50px]"
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
