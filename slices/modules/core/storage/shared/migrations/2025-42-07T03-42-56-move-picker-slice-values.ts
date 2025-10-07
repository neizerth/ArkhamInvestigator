import { omit, pick } from "ramda";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	// biome-ignore lint/suspicious/noExplicitAny: migration
	board?: any;
	// biome-ignore lint/suspicious/noExplicitAny: migration
	picker?: any;
};

export default function v22(state?: State) {
	if (!state?.board || !state?.picker) {
		return;
	}

	const props = [
		"pickerDecelerationType",
		"pickerIntervalMomentum",
		"pickerAnimation",
	];

	return {
		...state,
		board: omit(props, state.board),
		picker: {
			...state.picker,
			...pick(props, state.board),
		},
	};
}
