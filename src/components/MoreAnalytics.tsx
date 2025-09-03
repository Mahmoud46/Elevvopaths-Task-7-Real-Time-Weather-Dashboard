import { useContext } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	WiBarometer,
	WiCloud,
	WiCloudyGusts,
	WiFog,
	WiRaindrop,
	WiSnowflakeCold,
} from "react-icons/wi";
import { weatherDefinitions } from "../constants/Definitions";

export default function MoreAnalytics() {
	const { weatherData, tempUnit } = useContext(Context) as IContext;
	return (
		<>
			<div className="flex-1 min-w-[300px]">
				<div className="flex flex-wrap">
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiCloud className="text-3xl" />
						<div className="">
							<p className="text-xs text-gray-200">Cloud</p>
							<p>
								{weatherData?.current.cloud}
								<span className="text-sm">%</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiBarometer className="text-3xl" />
						<div className="">
							<p className="text-xs text-gray-200">Pressure</p>
							<p>
								{weatherData?.current.pressure_mb}
								<span className="text-sm">mb</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiCloudyGusts className="text-3xl" />
						<div className="">
							<p className="text-xs text-gray-200">Wind gust speed</p>
							<p>
								{weatherData?.current.gust_kph}
								<span className="text-sm">km/h</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiRaindrop className="text-3xl" />
						<div className="">
							<p className="text-xs text-gray-200">Dew Point</p>
							<p>
								{tempUnit == "C"
									? weatherData?.current.dewpoint_c
									: weatherData?.current.dewpoint_f}
								<span className="text-sm">&deg;{tempUnit}</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiFog className="text-3xl" />
						<div className="">
							<p className="text-xs text-gray-200">Visibility</p>
							<p>
								{weatherData?.current.vis_km}
								<span className="text-sm">km</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiSnowflakeCold className="text-3xl" />
						<div className="">
							<p className="text-xs text-gray-200">Wind Chill Temperature</p>
							<p>
								{tempUnit == "C"
									? weatherData?.current.windchill_c
									: weatherData?.current.windchill_f}

								<span className="text-sm">&deg;{tempUnit}</span>
							</p>
						</div>
					</div>
				</div>
				<hr className="border border-gray-500 my-2 " />
				<h1 className="font-semibold my-2 text-xl">Definitions</h1>
				<div className="flex flex-col gap-2">
					{weatherDefinitions.map((def, i) => (
						<div key={i} className="flex gap-4">
							<def.icon className="text-2xl flex-none" />
							<div className="">
								<h2 className="font-semibold">{def.title}</h2>
								<ul className="text-gray-200">
									<li className="text-sm list-disc">{def.definition}</li>
									<li className="text-sm list-disc">{def.meaning}</li>
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
