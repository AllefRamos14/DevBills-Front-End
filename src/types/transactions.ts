import type { Category, CategorySummary } from "./category";

export type TransactionType = "expense" | "income";

export interface Transaction {
	id: string;
	userId: string;
	description: string;
	amount: number;
	date: string | Date;
	category: Category;
	categoryId: string;
	type: TransactionType;
	updatedAt: string | Date;
	createdAt: string | Date;
}

export interface TransactionFilter {
	month: number;
	year: number;
	categoryId?: string;
	type?: TransactionType;
}

export interface TransactionSummary {
	totalExpenses: number;
	totalIncomes: number;
	balance: number;
	expensesByCategory: CategorySummary[];
}

export interface MothlyItem {
	name: string;
	expenses: number;
	income: number;
}
