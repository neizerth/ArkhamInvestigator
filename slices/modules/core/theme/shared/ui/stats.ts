import * as basic from "@assets/images/theme/basic";
import * as ffg from "@assets/images/theme/ffg";

import { withThemeBackground } from "./hoc";

export const ActionStatBackground = withThemeBackground({
	source: basic.actionImage,
});

export const HealthStatBackground = withThemeBackground({
	source: ffg.healthImage,
	fallbackSource: basic.healthImage,
});

export const SanityStatBackground = withThemeBackground({
	source: ffg.sanityImage,
	fallbackSource: basic.sanityImage,
});

export const ClueStatBackground = withThemeBackground({
	source: ffg.clueImage,
	fallbackSource: basic.clueImage,
});

export const DoomStatBackground = withThemeBackground({
	source: ffg.doomImage,
	fallbackSource: basic.doomImage,
});

export const HandSizeStatBackground = withThemeBackground({
	source: ffg.handSizeImage,
	fallbackSource: basic.handSizeImage,
});

export const ResourceStatBackground = withThemeBackground({
	source: ffg.resourceImage,
	fallbackSource: basic.resourceImage,
});
