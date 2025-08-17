import type { InvestigatorTokenEffectModificationCallback as Callback } from "../../model";
import { JimCulverBaseTokenEffects } from "./JimCulverBaseTokenEffects";
import { JimCulverParallelTokenEffects } from "./JimCulverParallelTokenEffects";
import { WendyAdamsTokenEffects } from "./WendyAdamsTokenEffects";

export { JimCulverBaseTokenEffects as JimCulverTokenEffects } from "./JimCulverBaseTokenEffects";

type EffectModifications = Partial<Record<string, Callback>>;

export const tokenEffectModifications: EffectModifications = {
	...JimCulverBaseTokenEffects,
	...JimCulverParallelTokenEffects,
	...WendyAdamsTokenEffects,
};
