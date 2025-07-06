import { whereId } from "@shared/lib";
import { reject } from "ramda";
import type { ChaosBagRevealHistoryHandler } from "../../../model";

export type HandleRemoveRevealHistoryItemPayload = {
	id: string;
};

export const handleRemoveRevealHistoryItem: ChaosBagRevealHistoryHandler<
	HandleRemoveRevealHistoryItemPayload
> = (state, { id }) => {
	state.revealHistory = reject(whereId(id), state.revealHistory);
};
