import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";
import type { ChaosBagToken, ChaosTokenType } from "../../../model";

export type AddChaosTokenPayload = {
	type: ChaosTokenType;
};

export const addChaosToken = createAction<AddChaosTokenPayload>(
	`${chaosBagPrefix}/addToken`,
);

export const cantAddChaosToken = createAction<AddChaosTokenPayload>(
	`${chaosBagPrefix}/cantAddToken`,
);

export type ChaosTokenAddedPayload = {
	token: ChaosBagToken;
};

export const chaosTokenAdded = createAction<ChaosTokenAddedPayload>(
	`${chaosBagPrefix}/tokenAdded`,
);

export const singleChaosTokenAdded = createAction<ChaosTokenAddedPayload>(
	`${chaosBagPrefix}/singleTokenAdded`,
);
