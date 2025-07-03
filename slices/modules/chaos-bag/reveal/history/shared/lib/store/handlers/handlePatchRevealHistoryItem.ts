import type {
	ChaosBagHandler,
	ChaosBagHistoryItemData,
} from "@modules/chaos-bag/base/shared/model";
import { whereId } from "@shared/lib";

export type HandlePatchRevealHistoryItemPayload = {
	id: string;
	data: Partial<ChaosBagHistoryItemData>;
};

export const handlePatchRevealHistoryItem: ChaosBagHandler<
	HandlePatchRevealHistoryItemPayload
> = (state, { data, id }) => {
	const index = state.revealHistory.findIndex(whereId(id));

	if (index === -1) {
		return;
	}

	state.revealHistory[index] = {
		...state.revealHistory[index],
		...data,
	};
};
