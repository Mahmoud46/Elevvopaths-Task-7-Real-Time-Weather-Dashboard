import { useContext, type ReactNode } from "react";
import type { HourInfo } from "../interfaces/WeatherForecast.interface";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";

export default function Graph({
	weatherData,
	graphStatus,
}: {
	weatherData: HourInfo[];
	graphStatus: "next" | "past";
}): ReactNode {
	const { tempUnit } = useContext(Context) as IContext;

	return (
		<div className="absolute p-4 pb-8 bg-theme-foreground w-full h-full rounded-xl">
			<h2 className="text-base font-semibold mb-2">
				Weather Trends (<span className="capitalize">{graphStatus}</span>{" "}
				{weatherData.length} hours)
			</h2>

			<ResponsiveContainer height={"100%"} width={"100%"}>
				<LineChart data={weatherData}>
					<CartesianGrid strokeOpacity={"20%"} strokeDasharray={"3 3"} />
					<XAxis dataKey={"time"} tick={{ fontSize: 10 }} />
					<Tooltip
						contentStyle={{
							backgroundColor: "#1e293b",
							border: "1px solid #94a3b8",
							color: "#f8fafc",
						}}
						wrapperStyle={{
							borderRadius: "12px",
						}}
						labelStyle={{
							color: "#ffffff",
							fontWeight: "bold",
						}}
						formatter={(value) => {
							const unit = tempUnit === "C" ? "°C" : "°F";
							return [`${value} ${unit}`, "Temp"]; // [value, label]
						}}
						labelFormatter={(label) => `Time: ${label}`}
					/>
					<Line
						type={"monotone"}
						dataKey={tempUnit == "C" ? "temp_c" : "temp_f"}
						stroke="#ffffff"
						strokeWidth={"2px"}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
