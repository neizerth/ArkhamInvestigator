import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";

export type RevealedChaosBagToken = ChaosBagToken & {
	value?: number;
};
