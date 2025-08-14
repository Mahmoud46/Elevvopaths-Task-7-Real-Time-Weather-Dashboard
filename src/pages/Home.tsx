import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { Link } from "react-router-dom";

export default function Home(): ReactNode {
	const { cities } = useContext(Context) as IContext;
	return (
		<>
			<div className="glass h-[80dvh] rounded-2xl p-8 flex flex-col items-center justify-center gap-3">
				<h1 className="text-3xl">Hello, Sunshine!</h1>
				<p className="text-center max-w-[700px]">
					Your weather, served fresh and friendly — see today’s forecast, plan
					your week, and never get caught in the rain again.
				</p>
				<Link
					to={`/${cities[0]}`}
					className="glass px-6 py-2 rounded-full overflow-hidden text-sm"
				>
					Explore Now
				</Link>
			</div>
		</>
	);
}
