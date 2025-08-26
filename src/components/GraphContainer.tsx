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
			{graphStatus == "past" && hourlyWeather && (
				<Graph weatherData={hourlyWeather} graphStatus="past" />
			)}

			{graphStatus == "next" && weatherTrend && (
				<Graph weatherData={weatherTrend} graphStatus="next" />
			)}
		</>
	);
}
