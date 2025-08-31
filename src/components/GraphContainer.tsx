import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import Graph from "./Graph";

export default function GraphContainer({
	graphStatus,
}: {
	graphStatus: "past" | "next";
}): ReactNode {
	const { hourlyWeather, weatherTrend } = useContext(Context) as IContext;
	return (
		<>
			{graphStatus == "past" && hourlyWeather && hourlyWeather.length > 0 && (
				<div className="relative min-w-[300px] aspect-[16/9] sm:aspect-[16/8] glass-mod rounded-2xl overflow-hidden">
					<Graph weatherData={hourlyWeather} graphStatus="past" />
				</div>
			)}

			{graphStatus == "next" && hourlyWeather && weatherTrend.length > 0 && (
				<div className="relative min-w-[300px] aspect-[16/9] sm:aspect-[16/8] glass-mod rounded-2xl overflow-hidden">
					<Graph weatherData={weatherTrend} graphStatus="next" />
				</div>
			)}
		</>
	);
}
