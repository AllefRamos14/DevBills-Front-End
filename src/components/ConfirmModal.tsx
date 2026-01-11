type ConfirmModalProps = {
	open: boolean;
	title?: string;
	description: string;
	onConfirm: () => void;
	onCancel: () => void;
	loading?: boolean;
};

const ConfirmModal = ({
	open,
	title = "Confirmar ação",
	description,
	onConfirm,
	onCancel,
	loading = false, // 👈 default
}: ConfirmModalProps) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
			<div className="bg-gray-900 rounded-xl p-6 w-full max-w-sm">
				<h2 className="text-lg font-semibold text-white mb-2">{title}</h2>

				<p className="text-gray-400 mb-6">{description}</p>

				<div className="flex justify-end gap-3">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
					>
						Cancelar
					</button>

					<button
						type="button"
						onClick={onConfirm}
						disabled={loading}
						className="px-4 py-2 rounded-lg bg-red-500 text-gray-950 font-semibold
							transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						{loading ? "Excluindo..." : "Excluir"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
