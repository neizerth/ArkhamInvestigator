import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";
import type { ChaosTokenType } from "../../../model";

export type AddChaosTokenPayload = PropsWithBoardId & {
	type: ChaosTokenType;
	count: number;
};

export const addChaosToken = createAction<AddChaosTokenPayload>(
	`${chaosBagPrefix}/addToken`,
);

export const chaosTokenAdded = createAction<AddChaosTokenPayload>(
	`${chaosBagPrefix}/tokenAdded`,
);
