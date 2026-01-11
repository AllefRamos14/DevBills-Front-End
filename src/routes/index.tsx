import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/Authcontext";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Novatransaçoes from "../pages/NewTransaction";
import Transacoes from "../pages/Transacoes";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />

					<Route element={<PrivateRoutes />}>
						<Route element={<AppLayout />}>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/transacoes" element={<Transacoes />} />
							<Route path="/novatransaçoes" element={<Novatransaçoes />} />
						</Route>
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
