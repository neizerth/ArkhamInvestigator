import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";

export type RevealedChaosBagTokenCancelType = boolean | "effect";

export type RevealedChaosBagToken = ChaosBagToken & {
	revealId: string;
	value?: ChaosTokenValue;
	canceled?: RevealedChaosBagTokenCancelType;
	modified?: boolean;
	removed?: boolean;
	virtual?: boolean;
};
