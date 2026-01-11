import { Activity } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";

const Header = () => {
	const navigate = useNavigate();
	const { signOut, authState } = useAuth();
	const user = authState.user;

	const location = useLocation();

	function isActive(path: string) {
		return location.pathname === path;
	}

	async function handleLogout() {
		try {
			await signOut();

			toast.success("Você saiu da conta!", {
				position: "top-right",
				autoClose: 2500,
				theme: "dark",
			});

			setTimeout(() => navigate("/login"), 1200);
		} catch (error) {
			console.error(error);
			toast.error("Erro ao sair da conta");
		}
	}

	return (
		<header className="bg-gray-900 border-b border-white/10">
			<div className="relative flex items-center justify-center py-4 px-4 sm:px-8">
				{/* LOGO - sempre alinhada à esquerda */}
				<h1
					className="
						absolute 
						left-4 sm:left-10 md:left-20 lg:left-32
						flex items-center gap-2 
						text-xl font-bold text-primary-500
					"
				>
					<Activity size={22} />
					DevBills
				</h1>

				{/* MENU CENTRAL */}
				<nav className="flex items-center gap-6 text-primary-500 text-sm sm:text-base">
					<a
						href="/dashboard"
						className={`
			px-3 py-2 rounded-md transition 
			${
				isActive("/dashboard")
					? "bg-green-500/10 text-green-500 "
					: "text-gray-400 border-transparent hover:bg-primary-500 hover:text-white"
			}
		`}
					>
						Dashboard
					</a>

					<a
						href="/transacoes"
						className={`
			px-3 py-2 rounded-md transition 
			${
				isActive("/transacoes")
					? "bg-green-500/10 text-green-500 "
					: "text-gray-400 border-transparent hover:bg-primary-500 hover:text-white"
			}
		`}
					>
						Transações
					</a>
				</nav>

				{/* USUÁRIO - alinhado à direita */}
				<div className="absolute right-4 sm:right-10 flex items-center gap-3 font-bold">
					<img
						src={user?.photoURL || "https://via.placeholder.com/40"}
						alt={user?.displayName || "Usuário"}
						referrerPolicy="no-referrer"
						className="w-10 h-10 rounded-full border border-white/20"
					/>

					<span className="hidden md:block text-white/80">
						{user?.displayName || "Usuário"}
					</span>

					<button type="button" onClick={handleLogout} className="cursor-pointer ">
						<img src="/src/assets/Button.png" alt="Sair" />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
