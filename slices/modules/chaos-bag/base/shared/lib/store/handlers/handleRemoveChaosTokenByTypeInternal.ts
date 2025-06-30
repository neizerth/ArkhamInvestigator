import { whereId } from "@shared/lib";
import { ascend, propEq, reject } from "ramda";
import type { ChaosBagHandler, ChaosTokenType } from "../../../model";

export type HandleRemoveChaosTokenByTypeInternalPayload = {
	type: ChaosTokenType;
};

export const handleRemoveChaosTokenByTypeInternal: ChaosBagHandler<
	HandleRemoveChaosTokenByTypeInternalPayload
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

	const [token] = tokens;
	const { id } = token;

	state.contents = reject(whereId(id), state.contents);
	state.tokenCount[type] = count - 1;
};
