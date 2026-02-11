export const setGlobalValue = <T>(key: string, value: T) => {
	(globalThis as unknown as Record<string, T>)[key] = value;
};

export const getGlobalValue = <T>(key: string): T | null => {
	return (globalThis as unknown as Record<string, T>)[key] ?? null;
};
