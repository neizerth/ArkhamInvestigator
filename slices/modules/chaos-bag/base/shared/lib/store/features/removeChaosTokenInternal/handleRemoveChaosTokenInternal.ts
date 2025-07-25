import { whereId } from "@shared/lib/util";
import { reject } from "ramda";
import type { ChaosBagHandler } from "../../../../model";

export type HandleRemoveChaosTokenInternalPayload = {
	id: string;
};

export const handleRemoveChaosTokenInternal: ChaosBagHandler<
	HandleRemoveChaosTokenInternalPayload
> = (state, { id }) => {
	const token = state.contents.find(whereId(id));
	if (!token) {
		return;
	}
	const { type } = token;
	const count = state.tokenCount[type];
	if (typeof count !== "number") {
		return;
	}
	state.contents = reject(whereId(id), state.contents);
	state.tokenCount[type] = Math.max(0, count - 1);
};
