import { useContext, type ReactNode } from "react";
import type { IContext } from "../interfaces/Context.interface";
import { Context } from "../context/Context";
import {
	calculateComfortLevel,
	calculateTempChange,
	calculateUpcomingTrend,
} from "../utils/Analytics";
import type { ChangeTrend } from "../interfaces/Weather.interface";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { BsActivity } from "react-icons/bs";
import { LuSun, LuThermometer, LuUmbrella } from "react-icons/lu";
import { UVIndextoRiskCondition } from "../utils/Parse";

export default function Analytics(): ReactNode {
	const { weatherData, hourlyWeather, weatherTrend, tempUnit } = useContext(
		Context
	) as IContext;
	const tempChange: ChangeTrend = calculateTempChange(hourlyWeather, tempUnit);
	const upComingTrend: ChangeTrend = calculateUpcomingTrend(
		weatherTrend,
		tempUnit
	);
	return (
		<>
			{weatherData && (
				<div className="flex flex-1 flex-col w-full h-full">
					<h3 className="text-lg font-semibold mb-2">Weather Analytics</h3>

					<div className="grid grid-cols-2 gap-2 text-sm glass-mod rounded-2xl">
						<div className="flex items-center gap-2 p-2">
							{tempChange.trend == "rising" ? (
								<BiTrendingUp className="text-red-400" size={18} />
							) : tempChange.trend == "falling" ? (
								<BiTrendingDown className="text-blue-400" size={18} />
							) : (
								<BsActivity size={18} className="text-blue-400" />
							)}
							<div>
								<p className="opacity-70 text-xs">Recent Trend</p>
								<p className="font-medium">
									{tempChange.value} {tempChange.trend}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2 p-2">
							{upComingTrend.trend == "rising" ? (
								<BiTrendingUp className="text-red-400" size={18} />
							) : upComingTrend.trend == "falling" ? (
								<BiTrendingDown className="text-blue-400" size={18} />
							) : (
								<BsActivity size={18} className="text-blue-400" />
							)}
							<div>
								<p className="opacity-70 text-xs">Upcoming</p>
								<p className="font-medium">
									{upComingTrend.value} {upComingTrend.trend}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2 p-2">
							<LuThermometer size={18} className="text-orange-400" />
							<div>
								<p className="opacity-70 text-xs">Feels Like</p>
								<p className="font-medium">
									{calculateComfortLevel(weatherData)}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2 p-2">
							<LuSun size={18} className="text-yellow-400" />
							<div>
								<p className="opacity-70 text-xs">UV Index</p>
								<p className="font-medium">
									{UVIndextoRiskCondition(weatherData.current.uv)}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 p-2 col-span-2">
							<LuUmbrella size={18} className="text-purple-400" />
							<div className="w-full">
								<p className="opacity-70">Precipitation Change</p>
								<div className="w-full glass h-2 rounded-full mt-1">
									<div
										className="bg-white h-2 rounded-full"
										style={{
											width: `${
												weatherData?.current.condition.text
													.toLowerCase()
													.includes("rain")
													? "70"
													: "15"
											}%`,
										}}
									></div>
								</div>
								<p className="text-xs mt-1 flex justify-end">
									{weatherData?.current.condition.text
										.toLowerCase()
										.includes("rain")
										? "High"
										: "Low"}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
