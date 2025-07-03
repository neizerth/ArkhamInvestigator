import { whereId } from "@shared/lib";
import { reject } from "ramda";
import type { ChaosBagHandler } from "../../../model";

export type HandleRemoveChaosTokenByIdPayload = {
	id: string;
};

export const handleRemoveChaosTokenById: ChaosBagHandler<
	HandleRemoveChaosTokenByIdPayload
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
	state.tokenCount[type] = count - 1;
};
