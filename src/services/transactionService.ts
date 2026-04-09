// import type {
// 	MonthlyItem,
// 	Transaction,
// 	TransactionFilter,
// 	TransactionSummary,
// } from "../types/transactions";
// import { api } from "./api";

// export const getTransactions = async (
// 	filter?: Partial<TransactionFilter>,
// ): Promise<Transaction[]> => {
// 	const response = await api.get<Transaction[]>("/transactions", {
// 		params: filter,
// 	});
// 	return response.data;
// };

// export const getTransactionsSummary = async (
// 	month: number,
// 	year: number,
// ): Promise<TransactionSummary> => {
// 	const response = await api.get<TransactionSummary>("/transactions/summary", {
// 		params: { month, year },
// 	});
// 	return response.data;
// };

// export const getTransactionsMontly = async (
// 	month: number,
// 	year: number,
// 	months?: number,
// ): Promise<{ history: MonthlyItem[] }> => {
// 	const response = await api.get("/transactions/historical", {
// 		params: {
// 			month,
// 			year,
// 			months,
// 		},
// 	});
// 	return response.data;
// };

// /* ✅ DELETE */
// export const deleteTransaction = async (id: string): Promise<void> => {
// 	await api.delete(`/transactions/${id}`);
// };
import type {
	MonthlyItem,
	Transaction,
	TransactionFilter,
	TransactionSummary,
} from "../types/transactions";
import { api } from "./api";
import { getAuthHeader } from "./authService";

export const getTransactions = async (
	filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
	const headers = await getAuthHeader();

	const response = await api.get<Transaction[]>("/transactions", {
		params: filter,
		headers,
	});

	return response.data;
};

export const getTransactionsSummary = async (
	month: number,
	year: number,
): Promise<TransactionSummary> => {
	const headers = await getAuthHeader();

	const response = await api.get<TransactionSummary>("/transactions/summary", {
		params: { month, year },
		headers,
	});

	return response.data;
};

export const getTransactionsMontly = async (
	month: number,
	year: number,
	months?: number,
): Promise<{ history: MonthlyItem[] }> => {
	const headers = await getAuthHeader();

	const response = await api.get<{ history: MonthlyItem[] }>(
		"/transactions/historical",
		{
			params: {
				month,
				year,
				months,
			},
			headers,
		},
	);

	return response.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
	const headers = await getAuthHeader();

	await api.delete(`/transactions/${id}`, {
		headers,
	});
};
