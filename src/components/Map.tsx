import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

export default function MapFrame(): ReactNode {
	const { weatherData } = useContext(Context) as IContext;

	return (
		<>
			{weatherData && (
				<div className="flex-1 rounded-2xl overflow-hidden min-w-[300px] sm:aspect-[16/9]">
					<iframe
						title="Google Map"
						src={`https://www.google.com/maps?q=${weatherData.location.lat},${weatherData.location.lon}&z=8&output=embed`}
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						width={"100%"}
						height={"100%"}
					></iframe>
				</div>
			)}
		</>
	);
}
