import type { InvestigatorSignature } from "arkham-investigator-data";
import { additionalActionAbility } from "../../../config";
import { isBoardAbility } from "../../info";

type Options = {
	investigator: InvestigatorSignature;
	investigatorsCount: number;
};

export const getInvestigatorBoardAbilities = ({
	investigator,
	investigatorsCount,
}: Options) => {
	const { abilities = [] } = investigator;
	const baseAbilities = abilities.filter(
		(ability) =>
			ability.visible !== false &&
			isBoardAbility({
				ability,
				investigatorsCount,
			}),
	);
	if (!investigator.additionalAction) {
		return baseAbilities;
	}

	return [...baseAbilities, additionalActionAbility];
};
