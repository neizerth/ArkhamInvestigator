import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";

export const includeChaosTokenInResult = ({
	sealed,
	canceled,
	removed,
}: RevealedChaosBagToken) => {
	return !sealed && canceled !== true && !removed;
};
