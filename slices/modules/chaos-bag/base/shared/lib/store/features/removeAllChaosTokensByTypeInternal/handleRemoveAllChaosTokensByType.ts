import type {
	ChaosBagHandler,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { ascend, propEq, reject } from "ramda";
import { validateChaosBagUpdate } from "../../util";

export type HandleRemoveAllChaosTokensByTypePayload = {
	type: ChaosTokenType;
	lastUpdatedAt: string;
};

export const handleRemoveAllChaosTokensByType: ChaosBagHandler<
	HandleRemoveAllChaosTokensByTypePayload
> = (state, { type, lastUpdatedAt }) => {
	if (!validateChaosBagUpdate(state, lastUpdatedAt)) {
		return;
	}
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
	state.tokenCount[type] = Math.max(0, count - tokens.length);
	state.chaosBagUpdatedAt = new Date().toISOString();
};
