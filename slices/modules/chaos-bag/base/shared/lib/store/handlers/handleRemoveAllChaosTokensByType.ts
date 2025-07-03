import { ascend, propEq, reject } from "ramda";
import type { ChaosBagHandler, ChaosTokenType } from "../../../model";

export type HandleRemoveAllChaosTokensByTypePayload = {
	type: ChaosTokenType;
};

export const handleRemoveAllChaosTokensByType: ChaosBagHandler<
	HandleRemoveAllChaosTokensByTypePayload
> = (state, { type }) => {
	const count = state.tokenCount[type];

	if (typeof count !== "number") {
		return;
	}

	const tokens = state.contents
		.filter(propEq(type, "type"))
		.sort(ascend(({ sealed }) => Boolean(sealed)));

	if (tokens.length === 0) {
		return;
	}

	state.contents = reject(propEq(type, "type"), state.contents);
	state.tokenCount[type] = count - tokens.length;
};
