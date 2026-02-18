import { getDefaultNickname } from "@modules/core/network/shared/lib";

// biome-ignore lint/suspicious/noExplicitAny: migration
export default function setDefaultNickname(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
		network: {
			...state.network,
			nickname: getDefaultNickname("en"),
		},
	};
}
