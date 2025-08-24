import type { ReactNode } from "react";
import {
	TbSnowflake,
	TbTemperatureMinus,
	TbShirt,
	TbSun,
	TbBottle,
	TbHome,
} from "react-icons/tb";

export function getRecommendationIcon(tempCelsius: number): ReactNode {
	if (tempCelsius <= 0) {
		return <TbSnowflake className="text-sky-400" />; // freezing
	} else if (tempCelsius > 0 && tempCelsius <= 10) {
		return <TbTemperatureMinus className="text-blue-500" />; // chilly
	} else if (tempCelsius > 10 && tempCelsius <= 20) {
		return <TbShirt className="text-green-600" />; // cool
	} else if (tempCelsius > 20 && tempCelsius <= 28) {
		return <TbSun className="text-yellow-500" />; // mild
	} else if (tempCelsius > 28 && tempCelsius <= 35) {
		return <TbBottle className="text-sky-600" />; // hot
	} else {
		return <TbHome className="text-red-600" />; // extreme
	}
}
