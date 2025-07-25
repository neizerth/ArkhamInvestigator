import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SpendCluesActionPayload = ChangeBoardEventPayload & {
	count: number;
};

export const spendClues = createAction<SpendCluesActionPayload>(
	"board/setScenarioClues",
);
