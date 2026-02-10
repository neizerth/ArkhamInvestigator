import { v4 } from "uuid";

// biome-ignore lint/suspicious/noExplicitAny: migration
export default function setDefaultNetworkId(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
		network: {
			...state.network,
			deviceNetworkId: v4(),
		},
	};
}
