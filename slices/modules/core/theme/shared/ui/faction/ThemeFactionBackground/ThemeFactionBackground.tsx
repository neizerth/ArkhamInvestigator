import { defaultFactionBackgroundImage } from "@assets/images/game/faction/background";
import { FactionBackground } from "@modules/faction/shared/ui/FactionBackground";
import { withThemeSource } from "../../hoc";

export const ThemeFactionBackground = withThemeSource(FactionBackground)({
	fallbackSource: defaultFactionBackgroundImage,
});
