import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../../../../../shared/lib/store/chaosBag";
import { getChaosTokenCountCanBeAdded } from "../../../../logic";

export const selectChaosTokenCountCanBeAdded =
	(type: ChaosTokenType) => (state: RootState) => {
		const unlimitedChaosTokens = selectUnlimitedChaosTokens(state);
		const tokenCount = selectChaosBagTokenCount(state);
		return getChaosTokenCountCanBeAdded({
			type,
			unlimitedChaosTokens,
			tokenCount,
		});
	};
