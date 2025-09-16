import { AlegreyaFonts } from "./Alegreya";
import { ArkhamDigitsFonts } from "./ArkhamDigits";
import { ArkhamIconsFonts } from "./ArkhamIcons";
import { ArkhamicFonts } from "./Arkhamic";
import { ArnoProFonts } from "./ArnoPro";
import { CopaseticFonts } from "./Copasetic";
import { CrimsonProFonts } from "./CrimsonPro";

export * from "./Alegreya";
export * from "./ArkhamDigits";
export * from "./Arkhamic";
export * from "./ArkhamIcons";
export * from "./ArnoPro";
export * from "./Copasetic";
export * from "./CrimsonPro";
export * from "./PrimaryFont";

export default {
	...ArkhamicFonts,
	...ArkhamIconsFonts,
	...AlegreyaFonts,
	...ArnoProFonts,
	...ArkhamDigitsFonts,
	...CopaseticFonts,
	...CrimsonProFonts,
};
