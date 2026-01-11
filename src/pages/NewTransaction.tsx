import { Calendar, ChevronDown, DollarSign, Tag } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { getCategories } from "../services/categoryService";
import { createTransaction } from "../services/createTransaction";

const transactionSchema = z.object({
	description: z.string().min(1, "Descrição obrigatória"),
	amount: z.number().positive("Valor inválido"),
	date: z.string().min(1, "Data obrigatória"),
	type: z.enum(["expense", "income"]),
	categoryId: z.string().min(1, "Categoria obrigatória"),
});

type Category = {
	id: string;
	name: string;
	type: "expense" | "income";
};

const NovaTransacoes = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string[]>>({});
	const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

	const descriptionId = useId();
	const amountId = useId();
	const dateId = useId();
	const categoryIdInput = useId();

	const inputBase =
		"w-full rounded-lg bg-[#141F2B] border border-white/10 px-3 py-2.5 text-sm text-gray-300 placeholder:text-gray-500 hover:border-white/20 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/40 transition-colors duration-200";

	const [form, setForm] = useState({
		description: "",
		amount: "",
		date: "",
		type: "expense" as "expense" | "income",
		categoryId: "",
		categoryName: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[name]: [],
		}));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const payload = {
			description: form.description,
			amount: Number(form.amount),
			date: form.date,
			type: form.type,
			categoryId: form.categoryId,
		};

		const parsed = transactionSchema.safeParse(payload);

		if (!parsed.success) {
			setErrors(parsed.error.flatten().fieldErrors);
			return;
		}

		try {
			setLoading(true);

			await createTransaction(parsed.data);

			toast.success(
				form.type === "income"
					? "Receita cadastrada com sucesso!"
					: "Despesa cadastrada com sucesso!",
			);

			setForm({
				description: "",
				amount: "",
				date: "",
				type: "expense",
				categoryId: "",
				categoryName: "",
			});
			setErrors({});
		} catch (error) {
			console.error(error);
			toast.error("Erro ao salvar a transação");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		async function loadCategories() {
			try {
				const response = await getCategories();
				setCategories(response);
			} catch {
				console.error("Erro ao carregar categorias");
			}
		}

		loadCategories();
	}, []);

	function handleCancel() {
		setForm({
			description: "",
			amount: "",
			date: "",
			type: "expense",
			categoryId: "",
			categoryName: "",
		});
		setErrors({});
		setShowCategoryDropdown(false);
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-xl">
				<h1 className="text-xl sm:text-2xl font-bold text-center mb-5">
					Nova Transação
				</h1>

				<form
					onSubmit={handleSubmit}
					className="rounded-2xl bg-[#011225]/90 border border-white/10 shadow-xl p-4 sm:p-6 space-y-5"
				>
					{/* TIPO */}
					<div>
						<span className="text-sm text-gray-300 font-bold">
							Tipo de Transação
						</span>

						<div className="mt-2 grid grid-cols-2 gap-3">
							<button
								type="button"
								onClick={() =>
									setForm((prev) => ({
										...prev,
										type: "expense",
										categoryId: "",
										categoryName: "",
									}))
								}
								className={`py-2 rounded-lg font-medium transition
									${
										form.type === "expense"
											? "border border-red-400 text-red-400"
											: "border border-white/10 text-gray-400 hover:border-white/20"
									}`}
							>
								Despesa
							</button>

							<button
								type="button"
								onClick={() =>
									setForm((prev) => ({
										...prev,
										type: "income",
										categoryId: "",
										categoryName: "",
									}))
								}
								className={`py-2 rounded-lg font-medium transition
									${
										form.type === "income"
											? "bg-green-400 text-black"
											: "border border-white/10 text-gray-400 hover:border-white/20"
									}`}
							>
								Receita
							</button>
						</div>
					</div>

					{/* DESCRIÇÃO */}
					<div>
						<label
							htmlFor={descriptionId}
							className="text-sm font-bold text-gray-300"
						>
							Descrição
						</label>
						<input
							id={descriptionId}
							name="description"
							value={form.description}
							onChange={handleChange}
							className={inputBase}
						/>
						{errors.description && (
							<p className="text-xs text-red-400 mt-1">{errors.description[0]}</p>
						)}
					</div>

					{/* VALOR */}
					<div>
						<label htmlFor={amountId} className="text-sm font-bold text-gray-300">
							Valor
						</label>
						<div className="relative">
							<DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
							<input
								id={amountId}
								name="amount"
								type="number"
								step="0.01"
								min="0"
								value={form.amount}
								onChange={handleChange}
								className={`${inputBase} pl-8`}
							/>
						</div>
					</div>

					{/* DATA */}
					<div>
						<label htmlFor={dateId} className="text-sm font-bold text-gray-300">
							Data
						</label>
						<div className="relative">
							<Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
							<input
								id={dateId}
								name="date"
								type="date"
								value={form.date}
								onChange={handleChange}
								className={`${inputBase} pl-8`}
							/>
						</div>
					</div>

					{/* CATEGORIA */}
					<div>
						<label
							htmlFor={categoryIdInput}
							className="text-sm font-bold text-gray-300"
						>
							Categoria
						</label>
						<div className="relative">
							<Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
							<input
								id={categoryIdInput}
								name="categoryName"
								value={form.categoryName}
								onChange={(e) => {
									setForm((prev) => ({
										...prev,
										categoryName: e.target.value,
										categoryId: "",
									}));
									setShowCategoryDropdown(true);
								}}
								placeholder="Selecione uma categoria"
								className={`${inputBase} pl-8 pr-10`}
								onFocus={() => setShowCategoryDropdown(true)}
							/>

							{/* Ícone clicável */}
							<ChevronDown
								className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer"
								onClick={() => setShowCategoryDropdown((prev) => !prev)}
							/>

							{/* DROPDOWN */}
							{showCategoryDropdown && (
								<div className="absolute z-10 w-full bg-gray-800 border border-white/10 mt-1 rounded max-h-60 overflow-auto">
									{categories
										.filter((c) => c.type === form.type)
										.map((c) => (
											<button
												type="button"
												key={c.id}
												onClick={() => {
													setForm((prev) => ({
														...prev,
														categoryName: c.name,
														categoryId: c.id,
													}));
													setShowCategoryDropdown(false);
												}}
												className="w-full text-left px-3 py-2 hover:bg-white/10 transition-colors"
											>
												{c.name}
											</button>
										))}
									{categories.filter((c) => c.type === form.type).length === 0 && (
										<p className="px-3 py-2 text-gray-400">Nenhuma categoria</p>
									)}
								</div>
							)}
						</div>
						{errors.categoryId && (
							<p className="text-xs text-red-400 mt-1">{errors.categoryId[0]}</p>
						)}
					</div>

					{/* AÇÕES */}
					<div className="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
						<button
							type="button"
							onClick={handleCancel}
							className="w-full sm:w-auto px-5 py-2 rounded-lg border border-green-400 text-green-400 hover:bg-green-400/10 transition"
						>
							Cancelar
						</button>

						<button
							type="submit"
							disabled={loading}
							className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold transition
								${
									loading
										? "bg-green-400/50 cursor-not-allowed"
										: "bg-green-400 hover:bg-green-500 text-black"
								}`}
						>
							{loading ? "Salvando..." : "Salvar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NovaTransacoes;
