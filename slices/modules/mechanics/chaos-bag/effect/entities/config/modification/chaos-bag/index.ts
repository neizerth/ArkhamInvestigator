import type { ChaosBagEffectModification } from "../../../model";
import { RexMurpyChaosBagEffects } from "./RexMurpyChaosBagEffects";
import { WendyAdamsChaosBagEffects } from "./WendyAdamsChaosBagEffects";

export const chaosBagEffectModifications: ChaosBagEffectModification = {
	...WendyAdamsChaosBagEffects,
	...RexMurpyChaosBagEffects,
};
