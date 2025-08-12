import { type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

export default function App(): ReactNode {
	return (
		<>
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path="/:city" element={<Dashboard />} />
			</Routes>
		</>
	);
}
