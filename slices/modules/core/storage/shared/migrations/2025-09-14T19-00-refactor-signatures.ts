// biome-ignore lint/suspicious/noExplicitAny: migration
export default function v17(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
		investigators: undefined,
		signatures: state.investigators,
	};
}
