import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";

export type RevealedChaosBagToken = ChaosBagToken & {
	value?: ChaosTokenValue;
};
