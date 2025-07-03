import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";
import { whereId } from "@shared/lib";
import { reject } from "ramda";

export type HandleRemoveRevealHistoryItemPayload = {
	id: string;
};

export const handleRemoveRevealHistoryItem: ChaosBagHandler<
	HandleRemoveRevealHistoryItemPayload
> = (state, { id }) => {
	state.revealHistory = reject(whereId(id), state.revealHistory);
};
