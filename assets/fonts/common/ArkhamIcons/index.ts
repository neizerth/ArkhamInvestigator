import type { ArkhamIcon } from "@shared/model";
import icons from "./ArkhamIcons.json";

export const ArkhamIconsDefault = require("./ArkhamIcons.ttf");

export const ArkhamIcons = {
	default: "ArkhamIconsDefault",
};

export const ArkhamIconsData = icons as ArkhamIcon[];

export const ArkhamIconsFonts = {
	ArkhamIconsDefault,
};
