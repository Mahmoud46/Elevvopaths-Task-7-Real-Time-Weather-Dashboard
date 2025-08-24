import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero_object.png";

export default function Home(): ReactNode {
	const { cities } = useContext(Context) as IContext;
	return (
		<>
			<div className="glass rounded-2xl p-8 flex flex-col lg:flex-row items-center lg:justify-start justify-center gap-3">
				<div className="flex flex-col gap-4 items-center lg:items-start">
					<h1 className="text-3xl text-center lg:text-start lg:text-4xl">
						Hello, Sunshine!
					</h1>
					<div className="w-[400px] h-[400px] flex-none block lg:hidden">
						<img
							src={heroImg}
							alt=""
							loading="lazy"
							className="w-[100%] h-[100%]"
						/>
					</div>
					<p className="text-center lg:text-start text-lg lg:text-2xl font-light">
						Your weather, served fresh and friendly — see today’s forecast, plan
						your week, and never get caught in the rain again.
					</p>
					<Link
						to={`/${cities[0]}`}
						className="glass px-6 py-2 rounded-full overflow-hidden text-sm w-fit"
					>
						Explore Now
					</Link>
				</div>
				<div className="w-[500px] h-[500px] flex-none hidden lg:block">
					<img
						src={heroImg}
						alt=""
						loading="lazy"
						className="w-[100%] h-[100%]"
					/>
				</div>
			</div>
		</>
	);
}
