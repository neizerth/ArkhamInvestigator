import { abilitiyBackgrounds } from "@assets/images/game/abilities";
import { handSizeImage } from "@assets/images/theme";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import type { ImageRequireSource } from "react-native";

export const backgrounds: Record<string, ImageRequireSource> = {
	[AbilityCode.PrestonFairmont.familyInheritance]:
		abilitiyBackgrounds.familyInheritance,
	[AbilityCode.TonyMorgan]: abilitiyBackgrounds.bountyContracts,
	[AbilityCode.Subject5U21]: abilitiyBackgrounds.ravenous,

	[AbilityCode.DianaStanley.counter]: handSizeImage,
	[AbilityCode.GloriaGoldberg]: handSizeImage,
	[AbilityCode.GeorgeBarnaby]: handSizeImage,
	[AbilityCode.ShatteredSelf]: handSizeImage,
};
