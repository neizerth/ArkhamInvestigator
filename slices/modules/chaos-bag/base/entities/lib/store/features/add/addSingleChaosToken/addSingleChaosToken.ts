import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddChaosTokenPayload = Partial<PropsWithBoardId> & {
	type: ChaosTokenType;
	source?: ChaosBagChangeSource;
};

export const addSingleChaosToken = createAction<AddChaosTokenPayload>(
	`${chaosBagPrefix}/addToken`,
);

export type CantAddChaosTokenPayload = AddChaosTokenPayload & {
	count: number;
	available: number;
	limit: number;
};

export const cantAddSingleChaosToken = createAction<CantAddChaosTokenPayload>(
	`${chaosBagPrefix}/cantAddToken`,
);

export type ChaosTokenAddedPayload = Partial<PropsWithBoardId> & {
	source?: ChaosBagChangeSource;
	token: ChaosBagToken;
};

export const chaosTokenAdded = createAction<ChaosTokenAddedPayload>(
	`${chaosBagPrefix}/tokenAdded`,
);

export const singleChaosTokenAdded = createAction<ChaosTokenAddedPayload>(
	`${chaosBagPrefix}/singleTokenAdded`,
);
