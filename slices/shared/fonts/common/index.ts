import { AlegreyaFonts } from "./Alegreya";
import { ArkhamDigitsFonts } from "./ArkhamDigits";
import { ArkhamicFonts } from "./Arkhamic";
import { ArkhamIconsFonts } from "./ArkhamIcons";
import { ArnoProFonts } from "./ArnoPro";
import { CopaseticFonts } from "./Copasetic";

export * from './Alegreya'
export * from './ArkhamDigits'
export * from './Arkhamic'
export * from './ArkhamIcons'
export * from './ArnoPro'
export * from './Copasetic'

export default {
  ...ArkhamicFonts,
  ...ArkhamIconsFonts,
  ...AlegreyaFonts,
  ...ArnoProFonts,
  ...ArkhamDigitsFonts,
  ...CopaseticFonts,
}