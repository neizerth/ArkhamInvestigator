import type { RevealedChaosBagTokenData } from "@modules/chaos-bag/reveal/base/shared/model";

export const isRevealedTokenActive = ({
	sealed,
	canceled,
	removed,
}: RevealedChaosBagTokenData) => {
	return !sealed && canceled !== true && !removed;
};
