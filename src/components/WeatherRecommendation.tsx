import { useContext, type ReactNode } from "react";
import type { IContext } from "../interfaces/Context.interface";
import { Context } from "../context/Context";
import { getRecommendation } from "../utils/Recommendations";
import type Weather from "../interfaces/Weather.interface";

export default function WeatherRecommendation(): ReactNode {
	const { weatherData } = useContext(Context) as IContext;

	const recommendation = getRecommendation(weatherData as Weather);

	return (
		<div className="flex flex-col w-full h-full">
			<h3 className="text-lg font-semibold mb-2">
				Today&apos;s Recommendation
			</h3>

			<div className="flex items-center gap-3 p-3 glass-mod rounded-2xl">
				<div className="p-2">{recommendation.icon}</div>
				<div className="flex-1">
					<h4 className="font-medium text-base">{recommendation.title}</h4>
					<p className="text-[12px] opacity-80">{recommendation.message}</p>
				</div>
			</div>
		</div>
	);
}
