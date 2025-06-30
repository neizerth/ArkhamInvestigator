import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddMultipleChaosTokenPayload = Partial<PropsWithBoardId> & {
	type: ChaosTokenType;
	count: number;
};

export const addMultipleChaosTokens =
	createAction<AddMultipleChaosTokenPayload>(
		`${chaosBagPrefix}/addMultipleTokens`,
	);

export type CantAddMultipleChaosTokenPayload = AddMultipleChaosTokenPayload & {
	available: number;
};

export const cantAddMultipleChaosTokens =
	createAction<CantAddMultipleChaosTokenPayload>(
		`${chaosBagPrefix}/cantAddMultipleTokens`,
	);

export type MultipleChaosTokenAddedPayload = AddMultipleChaosTokenPayload & {
	tokens: ChaosBagToken[];
};

export const multipleChaosTokensAdded =
	createAction<MultipleChaosTokenAddedPayload>(
		`${chaosBagPrefix}/multipleTokensAdded`,
	);
