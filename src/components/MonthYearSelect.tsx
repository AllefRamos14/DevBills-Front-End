import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId } from "react";

interface MonthYearSelectProp {
	month: number;
	year: number;
	onMonthChange: (month: number) => void;
	onYearChange: (year: number) => void;
}

const monthNames: readonly string[] = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
];

const MonthYearSelect = ({
	onMonthChange,
	onYearChange,
	month,
	year,
}: MonthYearSelectProp) => {
	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

	// ✅ IDs únicos por componente
	const monthId = useId();
	const yearId = useId();

	const handleNextMonth = (): void => {
		if (month === 12) {
			onMonthChange(1);
			onYearChange(year + 1);
		} else {
			onMonthChange(month + 1);
		}
	};

	const handlePrevMonth = (): void => {
		if (month === 1) {
			onMonthChange(12);
			onYearChange(year - 1);
		} else {
			onMonthChange(month - 1);
		}
	};

	return (
		<div className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700 cursor-pointer">
			<button
				type="button"
				className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer"
				aria-label="Mês Anterior"
				onClick={handlePrevMonth}
			>
				<ChevronLeft />
			</button>

			<div className="flex gap-4">
				<label htmlFor={monthId} className="sr-only">
					Selecionar Mês
				</label>
				<select
					id={monthId}
					onChange={(event) => onMonthChange(Number(event.target.value))}
					value={month}
					className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
				>
					{monthNames.map((name, index) => (
						<option key={name} value={index + 1}>
							{name}
						</option>
					))}
				</select>

				<label htmlFor={yearId} className="sr-only">
					Selecionar Ano
				</label>
				<select
					id={yearId}
					onChange={(event) => onYearChange(Number(event.target.value))}
					value={year}
					className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
				>
					{years.map((name) => (
						<option key={name} value={name}>
							{name}
						</option>
					))}
				</select>
			</div>

			<button
				type="button"
				className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors"
				aria-label="Próximo Mês"
				onClick={handleNextMonth}
			>
				<ChevronRight />
			</button>
		</div>
	);
};

export default MonthYearSelect;
