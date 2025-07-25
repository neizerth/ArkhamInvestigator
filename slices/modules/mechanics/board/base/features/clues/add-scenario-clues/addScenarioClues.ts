import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddScenarioCluesPayload = ChangeBoardEventPayload & {
	count: number;
};

export const addScenarioClues = createAction<AddScenarioCluesPayload>(
	"board/addScenarioClues",
);
