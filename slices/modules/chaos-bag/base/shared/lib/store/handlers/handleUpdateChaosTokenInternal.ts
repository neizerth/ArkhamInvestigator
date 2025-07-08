import { whereId } from "@shared/lib/util";
import type { ChaosBagHandler, ChaosBagTokenData } from "../../../model";

export type HandleUpdateChaosTokenInternalPayload = {
	id: string;
	data: Partial<ChaosBagTokenData>;
};

export const handleUpdateChaosTokenInternal: ChaosBagHandler<
	HandleUpdateChaosTokenInternalPayload
> = (state, { id, data }) => {
	const index = state.contents.findIndex(whereId(id));
	if (index === -1) {
		return;
	}
	const token = state.contents[index];

	state.contents[index] = {
		...token,
		...data,
	};
};
