import { api } from "./api";

export type Category = {
	id: string;
	name: string;
	type: "expense" | "income";
};

export const getCategories = async (): Promise<Category[]> => {
	const response = await api.get<Category[]>("/categories");
	return response.data;
};
