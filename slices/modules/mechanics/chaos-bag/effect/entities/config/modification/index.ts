import type { InvestigatorTokenEffectModificationCallback as Callback } from "../../model";
import { JimCulverTokenEffects } from "./JimCulverTokenEffects";

export { JimCulverTokenEffects } from "./JimCulverTokenEffects";

type EffectModifications = Partial<Record<string, Callback>>;

export const tokenEffectModifications: EffectModifications = {
	...JimCulverTokenEffects,
};
