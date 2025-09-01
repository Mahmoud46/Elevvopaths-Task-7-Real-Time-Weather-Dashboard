import { useContext, type ReactNode } from "react";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

export const PrecipitationChart = (): ReactNode => {
	const { weatherData } = useContext(Context) as IContext;

	const chartData = weatherData?.forecast.forecastday[0].hour.map((d) => {
		const date = new Date(d.time_epoch * 1000);
		const hour = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		return { hour, precip_mm: d.precip_mm };
	});

	return (
		<div className="absolute p-4 pb-8 bg-theme-foreground w-full h-full rounded-xl">
			<h2 className="text-base font-semibold mb-2">Hourly Precipitation</h2>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={chartData}>
					<CartesianGrid strokeOpacity={"20%"} strokeDasharray={"3 3"} />
					<XAxis dataKey="hour" tick={{ fontSize: 10 }} />
					<YAxis
						label={{
							value: "mm",
							angle: -90,
							fontSize: 10,
						}}
						tick={{ fontSize: 10 }}
					/>
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
						formatter={(value: number) => [`${value} mm`, "Precipitation"]}
						labelFormatter={(label: string) => `Time: ${label}`}
					/>
					<Bar dataKey="precip_mm" fill="#fff" radius={[6, 6, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PrecipitationChart;
