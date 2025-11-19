import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";

const abilityColors: Record<string, string | undefined> = {
	[AbilityCode.TonyMorgan]: "#31291e",
	[AbilityCode.Subject5U21]: "#3f693f",
	[AbilityCode.DaisyWalker.parallel]: "#6d5a3a",
	[AbilityCode.LukeRobinson]: "#975f49",
	[AbilityCode.KateWinthrop.darkMatter.fluxStabilizer]: "#60564d",
};
export const getValueStyle = (abilityId: string) => {
	const color = abilityColors[abilityId];
	return {
		fontSize: 30,
		color,
	};
};
