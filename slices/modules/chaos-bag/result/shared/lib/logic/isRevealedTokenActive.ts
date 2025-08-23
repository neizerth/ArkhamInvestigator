import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";

export const isRevealedTokenActive = ({
	sealed,
	canceled,
	removed,
}: RevealedChaosBagToken) => {
	return !sealed && canceled !== true && !removed;
};
