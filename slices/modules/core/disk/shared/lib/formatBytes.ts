import type { FileSystemUnit } from "../model";

type Options = {
	size: number;
	precision?: number;
};

export const formatBytes = ({ size, precision = 1 }: Options) => {
	const units: FileSystemUnit[] = [
		"b",
		"Kb",
		"Mb",
		"Gb",
		"Tb",
		"Pb",
		"Eb",
		"Zb",
		"Yb",
	];

	let i = 0;
	let value = size;

	for (i = 0; i < units.length - 1 && value >= 1024; i++) {
		value /= 1024;
	}

	const unit = units[i];
	const formattedValue =
		value % 1 === 0 ? value.toFixed(0) : value.toFixed(precision);

	return {
		value: formattedValue,
		unit,
	};
};
