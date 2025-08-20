import type { ChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import type { ReferenceCardToken } from "arkham-investigator-data";
import type { ChaosBagEffects } from "../../shared/model";

type Options = {
	effects: ChaosBagEffects;
	tokenInfo: ReferenceCardToken[];
	tokenValues: ChaosTokenValues;
};

export const replaceReferenceCardValues = (options: Options) => {};
