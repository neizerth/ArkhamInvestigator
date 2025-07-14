import { selectChaosBagTokenCount } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import { getChaosTokenCountCanBeRemoved } from "../../../../logic";

export const selectChaosTokenCountCanBeRemovedFromBag =
	(type: ChaosTokenType) => (state: RootState) => {
		const tokenCount = selectChaosBagTokenCount(state);
		return getChaosTokenCountCanBeRemoved({
			type,
			tokenCount,
		});
	};
