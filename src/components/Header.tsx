import { useContext, useState, type ReactNode } from "react";
import { BiDotsHorizontalRounded, BiSearch } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import hsLogo from "../assets/hs_logo.png";

export default function Header(): ReactNode {
	const { cities, setShowCitiesMenu } = useContext(Context) as IContext;
	const [searchKeyWord, setSearchKeyWord] = useState<string>("");
	const navigate = useNavigate();

	const location = useLocation();
	const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate(`/${searchKeyWord}`);
		setSearchKeyWord("");
	};

	return (
		<header className="fixed top-0 w-full px-2 py-4 sm:px-8 z-20">
			<div className="flex justify-between items-center glass rounded-full p-2">
				<Link to="/" className="">
					<img src={hsLogo} alt="HelloSky" className="h-[30px]" />
				</Link>

				<div className="relative flex items-center justify-center gap-4">
					<nav className="hidden gap-4 items-center sm:flex">
						{cities.slice(0, 3).map((city, i) => (
							<Link
								to={`/${city}`}
								key={i}
								className={`${
									i == 0 && location.pathname != "/"
										? "glass py-1 px-3 rounded-full overflow-hidden"
										: ""
								} `}
							>
								{city
									.split(" ")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ")}
							</Link>
						))}
					</nav>

					<BiDotsHorizontalRounded
						className="text-xl cursor-pointer"
						onClick={() => setShowCitiesMenu((prev) => !prev)}
					/>
				</div>

				<form
					className="flex items-center relative glass rounded-full overflow-hidden "
					onSubmit={onSearch}
				>
					<input
						type="text"
						className="pl-8 py-1 rounded-full focus:border-gray-300 outline-gray-300"
						value={searchKeyWord}
						onChange={(e) => setSearchKeyWord(e.target.value.toLowerCase())}
						placeholder="Search City"
						required
					/>
					<BiSearch className="absolute left-1 text-xl" />
				</form>
			</div>
		</header>
	);
}
