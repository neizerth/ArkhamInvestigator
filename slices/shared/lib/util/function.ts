import type { GenericFunction } from "@shared/model";

export const debounce = <T extends GenericFunction>(func: T, wait: number) => {
	let timeout: number;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

export const throttle = <T extends GenericFunction>(func: T, wait: number) => {
	let timeout: number;
	let lastArgs: Parameters<T>;
	return (...args: Parameters<T>) => {
		lastArgs = args;
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...lastArgs), wait);
	};
};
