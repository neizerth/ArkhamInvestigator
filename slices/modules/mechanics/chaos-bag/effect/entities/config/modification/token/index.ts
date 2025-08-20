import type { InvestigatorTokenEffectModificationCallback as Callback } from "../../../model";
import { JimCulverBaseTokenEffects } from "./JimCulverBaseTokenEffects";
import { JimCulverParallelTokenEffects } from "./JimCulverParallelTokenEffects";

type EffectModifications = Partial<Record<string, Callback>>;

export const tokenEffectModifications: EffectModifications = {
	...JimCulverBaseTokenEffects,
	...JimCulverParallelTokenEffects,
};
