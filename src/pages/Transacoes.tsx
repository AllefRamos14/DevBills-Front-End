// import { ArrowDown, ArrowUp, Search, Trash2Icon } from "lucide-react";   Codigo Atual
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import ConfirmModal from "../components/ConfirmModal";
// import MonthYearSelect from "../components/MonthYearSelect";
// import { deleteTransaction, getTransactions } from "../services/transactionService";
// import type { Transaction } from "../types/transactions";

// const Transacoes = () => {
// 	const [month, setMonth] = useState(new Date().getMonth() + 1);
// 	const [year, setYear] = useState(new Date().getFullYear());
// 	const [transactions, setTransactions] = useState<Transaction[]>([]);

// 	const [deleting, setDeleting] = useState(false);
// 	const [confirmOpen, setConfirmOpen] = useState(false);
// 	const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
// 		null,
// 	);
// 	const [search, setSearch] = useState("");

// 	const navigate = useNavigate();

// 	const filteredTransactions = transactions.filter((t) => {
// 		const term = search.toLowerCase();

// 		return (
// 			t.description.toLowerCase().includes(term) ||
// 			t.category.name.toLowerCase().includes(term)
// 		);
// 	});

// 	async function confirmDelete() {
// 		if (!transactionToDelete || deleting) return;

// 		try {
// 			setDeleting(true);

// 			await deleteTransaction(transactionToDelete);

// 			setTransactions((prev) => prev.filter((t) => t.id !== transactionToDelete));

// 			toast.success("Transação excluída com sucesso!");
// 		} catch (error) {
// 			console.error(error);
// 			toast.error("Erro ao excluir transação");
// 		} finally {
// 			setDeleting(false);
// 			setConfirmOpen(false);
// 			setTransactionToDelete(null);
// 		}
// 	}

// 	useEffect(() => {
// 		async function load() {
// 			const response = await getTransactions({ month, year });

// 			const normalized = response.map((t) => ({
// 				...t,
// 				date: new Date(t.date).toLocaleDateString("pt-BR"),
// 			}));

// 			setTransactions(normalized);
// 		}

// 		load();
// 	}, [month, year]);

// 	function generateColorFromId(value: string): string {
// 		const hash = Array.from(value).reduce(
// 			(acc, char) => acc + char.charCodeAt(0),
// 			0,
// 		);

// 		const colors = [
// 			"bg-cyan-400",
// 			"bg-yellow-400",
// 			"bg-blue-400",
// 			"bg-pink-400",
// 			"bg-green-400",
// 			"bg-purple-400",
// 			"bg-orange-400",
// 		];

// 		return colors[hash % colors.length];
// 	}

// 	function formatBRDate(date: string | Date): string {
// 		if (!date) return "Data inválida";

// 		if (date instanceof Date) {
// 			if (Number.isNaN(date.getTime())) return "Data inválida";
// 			return date.toLocaleDateString("pt-BR");
// 		}

// 		const [day, month, year] = date.split("/");
// 		const iso = `${year}-${month}-${day}`;
// 		const parsed = new Date(iso);

// 		if (Number.isNaN(parsed.getTime())) return "Data inválida";

// 		return parsed.toLocaleDateString("pt-BR");
// 	}

// 	return (
// 		<div className="max-w-6xl mx-auto ">
// 			{/* CABEÇALHO */}
// 			<div className="flex justify-between mb-4">
// 				<h1 className="text-xl font-bold text-gray-50">Transações</h1>

// 				<button
// 					type="button"
// 					className="bg-primary-500 text-gray-950 px-3 py-1.5 rounded-lg font-semibold hover:opacity-80 transition cursor-pointer"
// 					onClick={() => navigate("/novatransaçoes")}
// 				>
// 					+ Nova Transação
// 				</button>
// 			</div>

// 			{/* FILTRO (REDUZIDO) */}
// 			<div className="bg-gray-900 rounded-xl mb-4">
// 				<MonthYearSelect
// 					month={month}
// 					year={year}
// 					onMonthChange={setMonth}
// 					onYearChange={setYear}
// 				/>
// 			</div>

// 			{/* BUSCA (REDUZIDO) */}
// 			<div className="bg-gray-900 rounded-xl mb-4">
// 				<div className="px-4 py-6 relative">
// 					<Search
// 						size={18}
// 						className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
// 					/>
// 					<input
// 						type="text"
// 						placeholder="Buscar transação..."
// 						value={search}
// 						onChange={(e) => setSearch(e.target.value)}
// 						className="bg-gray-800 text-white py-1.5 pl-10 pr-4 rounded-lg
// 		                             border border-gray-700 w-full outline-none
// 	                             	focus:border-primary-500 transition"
// 					/>
// 				</div>
// 			</div>

// 			{/* TABELA (REDUZIDA) */}
// 			<div className="overflow-x-auto bg-gray-900 p-6 rounded-xl">
// 				<table className="w-full text-left border-collapse">
// 					<thead>
// 						<tr className="text-gray-400 border-b border-gray-400 text-sm">
// 							<th className="p-2">Descrição</th>
// 							<th className="p-2">Data</th>
// 							<th className="p-2">Categoria</th>
// 							<th className="p-2">Valor</th>
// 							<th className="p-2 text-center">Ações</th>
// 						</tr>
// 					</thead>

// 					<tbody>
// 						{filteredTransactions.map((t) => (
// 							<tr key={t.id} className="border-b border-gray-400 text-sm">
// 								<td className="p-2 flex items-center gap-2 text-white">
// 									{t.type === "expense" ? (
// 										<ArrowDown size={18} className="text-red-400" />
// 									) : (
// 										<ArrowUp size={18} className="text-primary-600" />
// 									)}
// 									{t.description}
// 								</td>

// 								<td className="p-2">{formatBRDate(t.date)}</td>

// 								<td className="p-2 flex items-center gap-2 text-white">
// 									<span
// 										className={`w-2 h-2 rounded-full ${generateColorFromId(
// 											t.category.name,
// 										)}`}
// 									></span>
// 									{t.category.name}
// 								</td>

// 								<td
// 									className={`p-2 ${
// 										t.type === "expense" ? "text-red-400" : "text-green-400"
// 									}`}
// 								>
// 									{t.type === "expense" ? "-" : "+"} R$ {t.amount}
// 								</td>

// 								<td className="p-2 text-center">
// 									<button
// 										type="button"
// 										onClick={() => {
// 											setTransactionToDelete(t.id);
// 											setConfirmOpen(true);
// 										}}
// 										className="p-1 hover:scale-110 transition cursor-pointer "
// 									>
// 										<Trash2Icon
// 											size={18}
// 											className="text-gray-400  hover:text-red-500 transition"
// 										/>
// 									</button>
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 			<ConfirmModal
// 				open={confirmOpen}
// 				title="Excluir transação"
// 				description="Tem certeza que deseja excluir esta transação? Essa ação não pode ser desfeita."
// 				onCancel={() => {
// 					setConfirmOpen(false);
// 					setTransactionToDelete(null);
// 				}}
// 				onConfirm={confirmDelete}
// 				loading={deleting}
// 			/>
// 		</div>
// 	);
// };

// export default Transacoes;

import { ArrowDown, ArrowUp, Search, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import MonthYearSelect from "../components/MonthYearSelect";
import { deleteTransaction, getTransactions } from "../services/transactionService";
import type { Transaction } from "../types/transactions";

const Transacoes = () => {
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const [deleting, setDeleting] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
		null,
	);
	const [search, setSearch] = useState("");

	const navigate = useNavigate();

	const filteredTransactions = transactions.filter((t) => {
		const term = search.toLowerCase();

		return (
			t.description.toLowerCase().includes(term) ||
			t.category.name.toLowerCase().includes(term)
		);
	});

	async function confirmDelete() {
		if (!transactionToDelete || deleting) return;

		try {
			setDeleting(true);
			await deleteTransaction(transactionToDelete);

			setTransactions((prev) => prev.filter((t) => t.id !== transactionToDelete));

			toast.success("Transação excluída com sucesso!");
		} catch (error) {
			console.error(error);
			toast.error("Erro ao excluir transação");
		} finally {
			setDeleting(false);
			setConfirmOpen(false);
			setTransactionToDelete(null);
		}
	}

	useEffect(() => {
		async function load() {
			const response = await getTransactions({ month, year });
			setTransactions(response); // 👈 NÃO formatar data aqui
		}

		load();
	}, [month, year]);

	function generateColorFromId(value: string): string {
		const hash = Array.from(value).reduce(
			(acc, char) => acc + char.charCodeAt(0),
			0,
		);

		const colors = [
			"bg-cyan-400",
			"bg-yellow-400",
			"bg-blue-400",
			"bg-pink-400",
			"bg-green-400",
			"bg-purple-400",
			"bg-orange-400",
		];

		return colors[hash % colors.length];
	}

	function formatBRDate(date: string | Date): string {
		const parsed = new Date(date);
		if (Number.isNaN(parsed.getTime())) return "Data inválida";
		return parsed.toLocaleDateString("pt-BR");
	}

	return (
		<div className="max-w-6xl mx-auto">
			{/* CABEÇALHO */}
			<div className="flex justify-between mb-4">
				<h1 className="text-xl font-bold text-gray-50">Transações</h1>

				<button
					type="button"
					className="bg-primary-500 text-gray-950 px-3 py-1.5 rounded-lg font-semibold hover:opacity-80 transition"
					onClick={() => navigate("/novatransaçoes")}
				>
					+ Nova Transação
				</button>
			</div>

			{/* FILTRO */}
			<div className="bg-gray-900 rounded-xl mb-4">
				<MonthYearSelect
					month={month}
					year={year}
					onMonthChange={setMonth}
					onYearChange={setYear}
				/>
			</div>

			{/* BUSCA */}
			<div className="bg-gray-900 rounded-xl mb-4">
				<div className="px-4 py-6 relative">
					<Search
						size={18}
						className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
					/>
					<input
						type="text"
						placeholder="Buscar transação..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="bg-gray-800 text-white py-1.5 pl-10 pr-4 rounded-lg 
							border border-gray-700 w-full outline-none 
							focus:border-primary-500 transition"
					/>
				</div>
			</div>

			{/* TABELA */}
			<div className="overflow-x-auto bg-gray-900 p-6 rounded-xl">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="text-gray-400 border-b border-gray-400 text-sm">
							<th className="p-2">Descrição</th>
							<th className="p-2">Data</th>
							<th className="p-2">Categoria</th>
							<th className="p-2">Valor</th>
							<th className="p-2 text-center">Ações</th>
						</tr>
					</thead>

					<tbody>
						{filteredTransactions.map((t) => (
							<tr key={t.id} className="border-b border-gray-400 text-sm">
								<td className="p-2 flex items-center gap-2 text-white">
									{t.type === "expense" ? (
										<ArrowDown size={18} className="text-red-400" />
									) : (
										<ArrowUp size={18} className="text-primary-600" />
									)}
									{t.description}
								</td>

								<td className="p-2">{formatBRDate(t.date)}</td>

								<td className="p-2 flex items-center gap-2 text-white">
									<span
										className={`w-2 h-2 rounded-full ${generateColorFromId(
											t.category.name,
										)}`}
									/>
									{t.category.name}
								</td>

								<td
									className={`p-2 ${
										t.type === "expense" ? "text-red-400" : "text-green-400"
									}`}
								>
									{t.type === "expense" ? "-" : "+"} R$ {t.amount}
								</td>

								<td className="p-2 text-center">
									<button
										type="button"
										onClick={() => {
											setTransactionToDelete(t.id);
											setConfirmOpen(true);
										}}
										className="p-1 hover:scale-110 transition"
									>
										<Trash2Icon
											size={18}
											className="text-gray-400 hover:text-red-500"
										/>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<ConfirmModal
				open={confirmOpen}
				title="Excluir transação"
				description="Tem certeza que deseja excluir esta transação?"
				onCancel={() => setConfirmOpen(false)}
				onConfirm={confirmDelete}
				loading={deleting}
			/>
		</div>
	);
};

export default Transacoes;
