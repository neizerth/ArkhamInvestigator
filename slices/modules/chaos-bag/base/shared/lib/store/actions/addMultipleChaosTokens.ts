import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";
import type { ChaosBagToken, ChaosTokenType } from "../../../model";

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
