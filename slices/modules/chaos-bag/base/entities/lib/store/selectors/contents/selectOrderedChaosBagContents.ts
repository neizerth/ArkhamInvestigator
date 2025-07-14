import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import type { RootState } from "@shared/model";
import { ascend, sortWith } from "ramda";
import { selectChaosBagContents } from "../../../../../shared/lib/store/chaosBag";

export const selectOrderedChaosBagContents = (state: RootState) =>
	sortWith(
		[
			ascend(({ sealed }) => (sealed ? 0 : 1)),
			ascend(({ type }) => chaosToken.types.order[type]),
		],
		selectChaosBagContents(state),
	);
