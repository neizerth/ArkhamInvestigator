import { createAction } from "@reduxjs/toolkit";
import { chaosBagRevealPrefix } from "../../../../shared/config";

export const addRevealHistoryItemFromCurrent = createAction(
	`${chaosBagRevealPrefix}/addHistoryItemFromCurrent`,
);
