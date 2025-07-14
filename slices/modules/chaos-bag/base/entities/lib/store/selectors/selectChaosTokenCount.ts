import { getChaosTokenCountByType } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import { selectChaosBagTokenCount } from "../../../../shared/lib/store/chaosBag";

export const selectChaosTokenCountByType =
	(type: ChaosTokenType) => (state: RootState) => {
		const tokenCount = selectChaosBagTokenCount(state);
		return getChaosTokenCountByType({
			type,
			tokenCount,
		});
	};
