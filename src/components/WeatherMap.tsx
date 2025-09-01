import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { OPEN_API_Key } from "../constants/APIConstants";
import { latLonToTile } from "../utils/Parse";

export default function WeatherMap(): ReactNode {
	const { weatherData } = useContext(Context) as IContext;
	const position = latLonToTile(
		weatherData?.location.lat as number,
		weatherData?.location.lon as number,
		5
	);

	return (
		<div className="">
			<img
				src={`https://tile.openweathermap.org/map/clouds_new/5/${position.x}/${position.y}.png?appid=${OPEN_API_Key}`}
			/>
		</div>
	);
}
