import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { CantAddChaosTokenPayload } from "../addSingleChaosToken";

export type AddMultipleChaosTokenPayload = Partial<PropsWithBoardId> & {
	type: ChaosTokenType;
	count: number;
};

export const addMultipleChaosTokens =
	createAction<AddMultipleChaosTokenPayload>(
		`${chaosBagPrefix}/addMultipleTokens`,
	);

export const cantAddMultipleChaosTokens =
	createAction<CantAddChaosTokenPayload>(
		`${chaosBagPrefix}/cantAddMultipleTokens`,
	);

export type MultipleChaosTokenAddedPayload = AddMultipleChaosTokenPayload & {
	tokens: ChaosBagToken[];
};

export const multipleChaosTokensAdded =
	createAction<MultipleChaosTokenAddedPayload>(
		`${chaosBagPrefix}/multipleTokensAdded`,
	);
