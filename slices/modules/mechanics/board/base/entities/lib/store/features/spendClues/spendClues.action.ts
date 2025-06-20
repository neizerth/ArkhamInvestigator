import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SpendCluesActionPayload = ChangeBoardEventPayload & {
	value: number;
};

export const spendCluesAction = createAction<SpendCluesActionPayload>(
	"board/setScenarioClues",
);
