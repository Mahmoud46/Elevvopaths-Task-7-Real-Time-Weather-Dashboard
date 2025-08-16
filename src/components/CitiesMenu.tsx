import { useContext, useEffect, useRef, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { Link, useNavigate } from "react-router-dom";

export default function CitiesMenu(): ReactNode {
	const { cities, showCitiesMenu, setShowCitiesMenu } = useContext(
		Context
	) as IContext;
	const menuRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setShowCitiesMenu(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setShowCitiesMenu]);

	return (
		<>
			{showCitiesMenu && (
				<div
					className="fixed glass z-20 top-15 left-[50%] flex flex-col rounded-xl overflow-x-hidden overflow-y-auto max-h-[300px]"
					ref={menuRef}
				>
					{cities.map((city, i) => (
						<Link
							className="py-1 px-4 hover:text-black hover:border-y-1 hover:border-y-gray-200"
							to={`/${city}`}
							key={i}
							onClick={(e) => {
								e.preventDefault();
								setShowCitiesMenu(false);
								navigate(`/${city}`);
							}}
						>
							{" "}
							{city.charAt(0).toUpperCase() + city.slice(1)}
						</Link>
					))}
				</div>
			)}
		</>
	);
}
