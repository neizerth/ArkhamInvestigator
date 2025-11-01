import { defaultTitleImage } from "@assets/images/game/title";
import { FactionTitleBackground } from "@modules/faction/shared/ui/FactionTitleBackground";
import { withThemeSource } from "../../hoc";

export const ThemeFactionTitleBackground = withThemeSource(
	FactionTitleBackground,
)({
	fallbackSource: defaultTitleImage,
});
