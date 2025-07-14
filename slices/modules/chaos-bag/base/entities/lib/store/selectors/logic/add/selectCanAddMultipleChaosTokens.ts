import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { RootState } from "@shared/model";
import {
	selectChaosBagTokenCount,
	selectUnlimitedChaosTokens,
} from "../../../../../../shared/lib/store/chaosBag";
import { canAddMultipleChaosTokens } from "../../../../logic";

type Options = {
	type: ChaosTokenType;
	count: number;
};

export const selectCanAddMultipleChaosTokens =
	(options: Options) => (state: RootState) => {
		const unlimitedChaosTokens = selectUnlimitedChaosTokens(state);
		const tokenCount = selectChaosBagTokenCount(state);
		return canAddMultipleChaosTokens({
			...options,
			unlimitedChaosTokens,
			tokenCount,
		});
	};
