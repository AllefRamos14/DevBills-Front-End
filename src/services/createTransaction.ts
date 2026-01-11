import { api } from "./api";

type CreateTransactionDTO = {
	description: string;
	amount: number;
	date: string;
	type: "expense" | "income";
	categoryId: string;
};

export const createTransaction = async (
	data: CreateTransactionDTO,
): Promise<void> => {
	await api.post("/transactions", data);
};
