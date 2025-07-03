import { createAction } from "@reduxjs/toolkit";
import { chaosBagRevealPrefix } from "../../../../shared/config";

export const addCurrentRevealHistoryItem = createAction(
	`${chaosBagRevealPrefix}/addCurrentHistoryItem`,
);
