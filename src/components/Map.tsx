import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { getWeatherRecommendation } from "../utils/Recommendations";
import { getRecommendationIcon } from "../utils/RecommendationIcon";

export default function MapFrame(): ReactNode {
	const { weatherData } = useContext(Context) as IContext;

	return (
		<>
			{weatherData && (
				<div className="flex-1 rounded-2xl overflow-hidden min-w-[300px] sm:aspect-[16/9] relative flex flex-col">
					<iframe
						title="Google Map"
						src={`https://www.google.com/maps?q=${weatherData.location.lat},${weatherData.location.lon}&z=8&output=embed`}
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						width={"100%"}
						height={"100%"}
					></iframe>
					<div className="sm:absolute sm:bottom-0 sm:w-[90%] p-2 text-sm sm:rounded-tr-2xl glass-mod sm:text-black flex gap-2">
						<div className="text-xl">
							{getRecommendationIcon(
								weatherData.current.temp_c,
								weatherData.current.condition.text,
								weatherData.current.humidity,
								weatherData.current.wind_kph,
								weatherData.current.uv
							)}
						</div>
						{getWeatherRecommendation(
							weatherData.current.temp_c,
							weatherData.current.condition.text,
							weatherData.current.humidity,
							weatherData.current.wind_kph,
							weatherData.current.uv
						)}
					</div>
				</div>
			)}
		</>
	);
}
