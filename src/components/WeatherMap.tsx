import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { latLonToTile } from "../utils/Parse";
import { OPEN_API_Key } from "../constants/APIConstants";

const mapCategories: Record<string, string> = {
	Wind: "wind_new",
	Clouds: "clouds_new",
	Precipitation: "precipitation_new",
	Pressure: "pressure_new",
	Temperature: "temp_new",
};

export default function WeatherMap({
	mapCategory,
}: {
	mapCategory: "Wind" | "Clouds" | "Precipitation" | "Pressure" | "Temperature";
}): ReactNode {
	const { weatherData } = useContext(Context) as IContext;
	const zoom: number = 6;
	const position = latLonToTile(
		weatherData?.location.lat as number,
		weatherData?.location.lon as number,
		zoom
	);

	return (
		<>
			<div className="flex-1 min-w-[200px] max-w-[300px] glass-mod p-2 rounded-2xl overflow-hidden">
				<h2 className="text-base font-semibold mb-2">{mapCategory} Map</h2>
				<div className="relative w-full aspect-[16/8] sm:aspect-[16/16] rounded-2xl overflow-hidden">
					<iframe
						title="Google Map"
						src={`https://www.google.com/maps?q=${weatherData?.location.lat},${weatherData?.location.lon}&z=${zoom}&output=embed&controls=0`}
						style={{ border: 0 }}
						loading="lazy"
						className="w-full h-full"
					></iframe>
					<img
						src={`https://tile.openweathermap.org/map/${mapCategories[mapCategory]}/${zoom}/${position.x}/${position.y}.png?appid=${OPEN_API_Key}`}
						alt=""
						className="absolute w-full h-full top-0 left-0"
					/>
				</div>
			</div>
		</>
	);
}
