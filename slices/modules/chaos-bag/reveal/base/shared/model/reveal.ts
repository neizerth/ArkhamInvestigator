import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";

export type RevealedChaosBagTokenCancelType = boolean | "effect";

export type RevealedChaosBagToken = RevealedChaosBagTokenData & {
	revealId: string;
};

export type RevealedChaosBagTokenData = ChaosBagToken & {
	value?: ChaosTokenValue;
	canceled?: RevealedChaosBagTokenCancelType;
	modified?: boolean;
	removed?: boolean;
	virtual?: boolean;
};
