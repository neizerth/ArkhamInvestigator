import { withOrientation } from "@modules/core/device/entities/base/lib";
import { ChaosBagPageLandscape } from "./ChaosBagPage.landscape";
import { ChaosBagPagePortrait } from "./ChaosBagPage.portrait";

export const ChaosBagPage = withOrientation({
	PortraitComponent: ChaosBagPagePortrait,
	LandscapeComponent: ChaosBagPageLandscape,
});
