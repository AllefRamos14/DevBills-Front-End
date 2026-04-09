import { firebaseAuth } from "../config/Firebase";

export const getAuthHeader = async () => {
	const user = firebaseAuth.currentUser;

	if (!user) {
		throw new Error("Usuário não autenticado");
	}

	const token = await user.getIdToken();

	return {
		Authorization: `Bearer ${token}`,
	};
};
