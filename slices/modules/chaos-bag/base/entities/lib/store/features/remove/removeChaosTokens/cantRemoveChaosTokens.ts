import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type CantRemoveChaosTokensPayload = Partial<PropsWithBoardId> & {
	source?: ChaosBagChangeSource;
	type: ChaosTokenType;
	count: number;
	available: number;
};

export const cantRemoveChaosTokens = createAction<CantRemoveChaosTokensPayload>(
	`${chaosBagPrefix}/cantRemoveChaosTokens`,
);
