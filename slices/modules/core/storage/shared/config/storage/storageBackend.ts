let data: Record<string, string> = {};

export default {
	getItem: (key: string) => data[key],
	setItem: (key: string, value: string) => {
		data[key] = value;
	},
	clear: () => {
		data = {};
	},
};
