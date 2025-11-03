import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { getUnusedEffects } from "../../lib";

const iconMap: Record<string, string> = {
	[AbilityCode.RichardCarlisle.effects.card]: "card-outline",
	[AbilityCode.RichardCarlisle.effects.resource]: "resource",
	[AbilityCode.RichardCarlisle.effects.damage]: "health",
	[AbilityCode.RichardCarlisle.effects.clue]: "clue",
};

export const getModalActions = ({ usedAbilities = [] }: InvestigatorBoard) => {
	return getUnusedEffects(usedAbilities).map((id) =>
		createConfirmModalAction({
			id,
			title: "",
			icon: iconMap[id],
			style: {
				justifyContent: "center",
			},
		}),
	);
};
