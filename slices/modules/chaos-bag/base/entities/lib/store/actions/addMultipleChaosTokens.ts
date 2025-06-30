import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddMultipleChaosTokenPayload = {
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

export type MultipleChaosTokenAddedPayload = {
	tokens: ChaosBagToken[];
};

export const multipleChaosTokensAdded =
	createAction<MultipleChaosTokenAddedPayload>(
		`${chaosBagPrefix}/multipleTokensAdded`,
	);
