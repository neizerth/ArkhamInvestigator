// biome-ignore lint/suspicious/noExplicitAny: migration
export default function refactorSignatures(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
		investigators: undefined,
		signatures: state.investigators,
	};
}
