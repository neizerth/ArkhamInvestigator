import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	signature?: {
		investigatorSettings?: unknown;
		signatureSettings?: unknown;
	};
};

export default function moveInvestigatorSettings(state?: State) {
	if (!state) {
		return;
	}

	const { signature } = state;

	return {
		...state,
		signature: {
			...signature,
			signatureSettings: signature?.investigatorSettings,
		},
	};
}
