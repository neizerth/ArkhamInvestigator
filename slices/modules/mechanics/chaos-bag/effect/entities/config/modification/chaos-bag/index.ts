import type { ChaosBagEffectModification } from "../../../model";
import { HenryBigbyChaosBagEffects } from "./HenryBigbyChaosBagEffects";
import { RexMurpyChaosBagEffects } from "./RexMurpyChaosBagEffects";
import { WendyAdamsChaosBagEffects } from "./WendyAdamsChaosBagEffects";

export const chaosBagEffectModifications: ChaosBagEffectModification = {
	...WendyAdamsChaosBagEffects,
	...RexMurpyChaosBagEffects,
	...HenryBigbyChaosBagEffects,
};
