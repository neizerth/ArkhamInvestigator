import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export const addRevealHistoryItemFromCurrent = createAction(
	`${chaosBagRevealPrefix}/addHistoryItemFromCurrent`,
);
