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
			<div className="flex-1 flex flex-col min-w-[300px] gap-2">
				<div className="flex flex-wrap glass p-2 rounded-2xl">
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiCloud className="text-3xl text-slate-400" />
						<div className="">
							<p className="text-xs opacity-70">Cloud</p>
							<p className="font-medium">
								{weatherData?.current.cloud}
								<span className="text-sm">%</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiBarometer className="text-3xl text-indigo-500" />
						<div className="">
							<p className="text-xs opacity-70">Pressure</p>
							<p className="font-medium">
								{weatherData?.current.pressure_mb}
								<span className="text-sm">mb</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiCloudyGusts className="text-3xl text-sky-500" />
						<div className="">
							<p className="text-xs opacity-70">Wind gust speed</p>
							<p className="font-medium">
								{weatherData?.current.gust_kph}
								<span className="text-sm">km/h</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiRaindrop className="text-3xl text-cyan-500" />
						<div className="">
							<p className="text-xs opacity-70">Dew Point</p>
							<p className="font-medium">
								{tempUnit == "C"
									? weatherData?.current.dewpoint_c
									: weatherData?.current.dewpoint_f}
								<span className="text-sm">&deg;{tempUnit}</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiFog className="text-3xl text-gray-400" />
						<div className="">
							<p className="text-xs opacity-70">Visibility</p>
							<p className="font-medium">
								{weatherData?.current.vis_km}
								<span className="text-sm">km</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 min-w-[100px] max-w-[200px] p-2">
						<WiSnowflakeCold className="text-3xl text-blue-400" />
						<div className="">
							<p className="text-xs opacity-70">Wind Chill Temperature</p>
							<p className="font-medium">
								{tempUnit == "C"
									? weatherData?.current.windchill_c
									: weatherData?.current.windchill_f}

								<span className="text-sm">&deg;{tempUnit}</span>
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col glass p-2 gap-2 rounded-2xl overflow-hidden">
					<h1 className="font-semibold text-xl">Definitions</h1>
					<div className="flex flex-col gap-2">
						{weatherDefinitions.map((def, i) => (
							<div key={i} className="flex flex-col gap-1">
								<div className="flex items-center gap-2">
									<def.icon className={`text-3xl flex-none ${def.color}`} />
									<h2 className="font-semibold">{def.title}</h2>
								</div>
								<ul className="text-gray-200 pl-14">
									<li className="text-sm list-disc">{def.definition}</li>
									<li className="text-sm list-disc">{def.meaning}</li>
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
