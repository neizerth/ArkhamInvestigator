// biome-ignore lint/suspicious/noExplicitAny: migration
export default function <FTName | camelcase>(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
	};
}
