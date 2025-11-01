import { defaultFactionDescriptionImage } from "@assets/images/game/description";
import { FactionDescriptionBackground } from "@modules/faction/shared/ui/FactionDescriptionBackground";
import { withThemeSource } from "../../hoc";

export const ThemeFactionDescriptionBackground = withThemeSource(
	FactionDescriptionBackground,
)({
	fallbackSource: defaultFactionDescriptionImage,
});
