// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/Authcontext";

// const PrivateRoutes = () => {
// 	const { authState } = useAuth();

// 	if (!authState.user) {
// 		return <Navigate to="/login" replace />;
// 	}

// 	return <Outlet />;
// };
// export default PrivateRoutes;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const PrivateRoutes = () => {
	const { authState } = useAuth();

	// enquanto carrega, NÃO redirecione nem renderize o Dashboard ainda
	if (authState.loading) {
		return (
			<div className="w-full h-screen flex items-center justify-center text-gray-300">
				Carregando...
			</div>
		);
	}

	// se não estiver logado
	if (!authState.user) {
		return <Navigate to="/login" replace />;
	}

	// autorizado
	return <Outlet />;
};

export default PrivateRoutes;
