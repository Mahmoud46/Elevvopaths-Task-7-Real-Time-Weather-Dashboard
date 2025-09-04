import { useContext, useState, type ReactNode } from "react";
import { mapActionButtons } from "../constants/Definitions";
import type { IWeatherMapLayer } from "../interfaces/OpenWeatherMap.interface";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { latLonToTile } from "../utils/Parse";
import { OPEN_API_Key } from "../constants/APIConstants";

export default function WeatherMapLayer(): ReactNode {
	const [cat, setCat] = useState<IWeatherMapLayer>("wind_new");
	const { weatherData } = useContext(Context) as IContext;
	const zoom: number = 6;
	const position = latLonToTile(
		weatherData?.location.lat as number,
		weatherData?.location.lon as number,
		zoom
	);

	const [loading, setLoading] = useState<boolean>(true);

	return (
		<>
			{weatherData && (
				<div className="flex flex-col gap-2 min-w-[300px] w-full sm:max-w-500 sm:w-[400px]">
					{loading && <div>Loading..</div>}
					<div className="flex overflow-auto glass p-1 rounded-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
						{mapActionButtons.map((btn, i) => (
							<button
								key={i}
								className={`flex gap-1 flex-none py-1 px-2 rounded-full overflow-hidden cursor-pointer ${
									cat == btn.cat ? "bg-white text-black" : ""
								}`}
								onClick={() => setCat(btn.cat)}
							>
								<btn.icon className="text-2xl" />
								{btn.title}
							</button>
						))}
					</div>
					<div className="w-full">
						<div className="relative w-full aspect-[16/8] sm:aspect-[16/16] rounded-2xl overflow-hidden">
							<iframe
								title="Google Map"
								src={`https://www.google.com/maps?q=${weatherData?.location.lat},${weatherData?.location.lon}&z=${zoom}&output=embed&controls=0`}
								style={{ border: 0 }}
								loading="lazy"
								className="w-full h-full"
								onLoad={() => setLoading(false)}
							></iframe>
							<img
								src={`https://tile.openweathermap.org/map/${cat}/${zoom}/${position.x}/${position.y}.png?appid=${OPEN_API_Key}`}
								alt=""
								className="absolute w-full h-full top-0 left-0"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
