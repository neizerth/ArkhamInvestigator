import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddChaosTokensPayload = Partial<PropsWithBoardId> & {
	tokens: ChaosTokenType[];
	source?: ChaosBagChangeSource;
};

export const addChaosTokens = createAction<AddChaosTokensPayload>(
	`${chaosBagPrefix}/addChaosTokens`,
);

export type ChaosTokensAddedPayload = AddChaosTokensPayload & {
	addedTokens: ChaosBagToken[];
};

export const chaosTokensAdded = createAction<ChaosTokensAddedPayload>(
	`${chaosBagPrefix}/tokensAdded`,
);
