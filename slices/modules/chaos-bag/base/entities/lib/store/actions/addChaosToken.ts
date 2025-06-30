import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddChaosTokenPayload = Partial<PropsWithBoardId> & {
	type: ChaosTokenType;
};

export const addChaosToken = createAction<AddChaosTokenPayload>(
	`${chaosBagPrefix}/addToken`,
);

export const cantAddChaosToken = createAction<AddChaosTokenPayload>(
	`${chaosBagPrefix}/cantAddToken`,
);

export type ChaosTokenAddedPayload = Partial<PropsWithBoardId> & {
	token: ChaosBagToken;
};

export const chaosTokenAdded = createAction<ChaosTokenAddedPayload>(
	`${chaosBagPrefix}/tokenAdded`,
);

export const singleChaosTokenAdded = createAction<ChaosTokenAddedPayload>(
	`${chaosBagPrefix}/singleTokenAdded`,
);
