import type { PropsWithBoard } from "@modules/board/base/shared/model";
import type { InvestigatorAbility } from "arkham-investigator-data";

export type InvestigatorAbilityModificationCallbackOptions = PropsWithBoard & {
	ability: InvestigatorAbility;
};

export type InvestigatorAbilityModificationCallback = (
	options: InvestigatorAbilityModificationCallbackOptions,
) => InvestigatorAbility;

export type InvestigatorAbilityModification = Record<
	string,
	InvestigatorAbilityModificationCallback
>;
