import { propEq } from "ramda";
import type { ChaosBagEffectsCallback } from "../../../model";

export const getFrostTokenChaosBagEffects: ChaosBagEffectsCallback = ({
	revealedTokens,
}) => {
	const frostCount = revealedTokens.filter(propEq("frost", "type")).length;

	const effect =
		frostCount < 2
			? "chaosToken.frost.first.effect"
			: "chaosToken.frost.second.effect";

	return {
		frost: effect,
	};
};
