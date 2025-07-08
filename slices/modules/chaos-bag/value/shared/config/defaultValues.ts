import type { ChaosTokenType } from "@features/game/chaos-bag/model";

export const defaultChaosTokenValues: Partial<Record<ChaosTokenType, number>> =
	{
		frost: -1,
		bless: 2,
		curse: -2,
	};
