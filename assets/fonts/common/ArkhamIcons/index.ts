import { ArkhamIcon } from "@shared/model";
import icons from "./ArkhamIcons.json";

// export const ArkhamIconsDefault = `${API_URL}/fonts/icons.ttf?v=${APP_VERSION}&subversion=7`;
export const ArkhamIconsDefault = require("./ArkhamIcons.ttf");

export const ArkhamIcons = {
	default: "ArkhamIconsDefault",
};

export const ArkhamIconsData = icons as ArkhamIcon[];

export const ArkhamIconsFonts = {
	ArkhamIconsDefault,
};
