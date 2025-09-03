import { type ReactNode } from "react";

import MoreAnalytics from "./MoreAnalytics";
import WeatherMapLayer from "./WeatherMapLayer";

export default function WeatherFullAnalytics(): ReactNode {
	return (
		<div className="flex w-full gap-4 flex-wrap">
			<WeatherMapLayer />
			<MoreAnalytics />
		</div>
	);
}
