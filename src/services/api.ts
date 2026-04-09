// import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
// import { firebaseAuth } from "../config/Firebase";

// console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

// export const api: AxiosInstance = axios.create({
// 	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
// 	timeout: 10000, // 10 segundos
// });

// api.interceptors.request.use(
// 	async (
// 		config: InternalAxiosRequestConfig,
// 	): Promise<InternalAxiosRequestConfig> => {
// 		try {
// 			const user = firebaseAuth.currentUser;

// 			if (user) {
// 				const token = await user.getIdToken();
// 				config.headers.set("Authorization", `Bearer ${token}`);
// 			}
// 		} catch (error) {
// 			console.error("Erro ao obter token do usuário no Firebase", error);
// 		}

// 		return config;
// 	},
// );

import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { firebaseAuth } from "../config/Firebase";

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

export const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
	timeout: 30000,
});

api.interceptors.request.use(
	async (
		config: InternalAxiosRequestConfig,
	): Promise<InternalAxiosRequestConfig> => {
		try {
			const user = firebaseAuth.currentUser;

			console.log("currentUser no interceptor:", user?.email);

			if (user) {
				const token = await user.getIdToken();
				config.headers.Authorization = `Bearer ${token}`;
				console.log("Token enviado com sucesso");
			} else {
				console.warn("Nenhum usuário autenticado no momento da requisição");
			}
		} catch (error) {
			console.error("Erro ao obter token do usuário no Firebase", error);
		}

		return config;
	},
	(error) => Promise.reject(error),
);
