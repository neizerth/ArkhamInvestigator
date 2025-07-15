import type { ChaosBagEffectsCallback } from "../../../model";

export const getDefaultKnownChaosBagEffects: ChaosBagEffectsCallback = () => ({
	autoFail: "chaosToken.autoFail.effect",
	bless: "chaosToken.bless.effect",
	curse: "chaosToken.curse.effect",
});
