import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { WindArrow } from "../utils/WeatherIcon";

export default function WindTrends(): ReactNode {
	const { weatherData } = useContext(Context) as IContext;
	return (
		<div className="flex flex-col w-full">
			<h1 className="text-base font-semibold mb-2">Today’s Wind Trends</h1>
			<div className="flex gap-2 w-full overflow-auto glass-mod p-2 sm:p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl">
				{weatherData?.forecast.forecastday[0].hour.map((hour, i) => (
					<div key={i} className="flex-none flex flex-col items-center gap-2">
						<p className="text-xs">
							{new Date(hour.time as string).toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							})}
						</p>
						<WindArrow speed={hour.wind_kph} angle={hour.wind_degree} />
						<p>
							{hour.wind_kph} <span className="text-xs">km/h</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
