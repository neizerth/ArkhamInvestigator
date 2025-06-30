import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";
import type { ChaosBagToken, ChaosTokenType } from "../../../model";

export type AddChaosTokenPayload = PropsWithBoardId & {
	type: ChaosTokenType;
};

export const addChaosToken = createAction<AddChaosTokenPayload>(
	`${chaosBagPrefix}/addToken`,
);

export type CantAddChaosTokenPayload = PropsWithBoardId & {
	type: ChaosTokenType;
};

export const cantAddChaosToken = createAction<CantAddChaosTokenPayload>(
	`${chaosBagPrefix}/cantAddToken`,
);

export type ChaosTokenAddedPayload = PropsWithBoardId & {
	token: ChaosBagToken;
};

export const chaosTokenAdded = createAction<ChaosTokenAddedPayload>(
	`${chaosBagPrefix}/tokenAdded`,
);
