// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function setDefaultChaosBagHistory(state?: any) {
	if (!state?.chaosBag) {
		return;
	}

	return {
		...state,
		chaosBag: {
			...state.chaosBag,
			skillCheckExpression: state.chaosBag?.skillCheckExpression || [],
			revealHistory: state.chaosBag?.revealHistory || [],
		},
	};
}
