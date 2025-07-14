import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../../../../../shared/lib/store/chaosBag";
import { canAddChaosToken } from "../../../../logic";

export const selectCanAddChaosToken =
	(type: ChaosTokenType) => (state: RootState) => {
		const unlimitedChaosTokens = selectUnlimitedChaosTokens(state);
		const tokenCount = selectChaosBagTokenCount(state);
		return canAddChaosToken({
			type,
			unlimitedChaosTokens,
			tokenCount,
		});
	};
