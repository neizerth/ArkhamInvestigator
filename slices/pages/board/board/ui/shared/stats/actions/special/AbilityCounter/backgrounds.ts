import { handSizeImage } from "@assets/images/game/stats";
import { abilitiyBackgrounds } from "@assets/images/game/stats/abilities";
import type { ImageRequireSource } from "react-native";

export const backgrounds: Record<string, ImageRequireSource> = {
	"family-inheritance": abilitiyBackgrounds.familyInheritance,
	"bounty-contracts": abilitiyBackgrounds.bountyContracts,
	ravenous: abilitiyBackgrounds.ravenous,

	"diana-cards": handSizeImage,
	"gloria-cards": handSizeImage,
	"george-cards": handSizeImage,
	"shattered-self-cards": handSizeImage,
};
