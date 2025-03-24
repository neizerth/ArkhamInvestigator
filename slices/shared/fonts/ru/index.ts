import { ConkordiaFonts } from "./Conkordia";
import { Enthalpy298Fonts } from "./Enthalpy298";
import { TeutonicRUFonts } from "./TeutonicRU";

export * from "./Conkordia";
export * from "./TeutonicRU";
export * from "./Enthalpy298"

export default {
	...ConkordiaFonts,
	...TeutonicRUFonts,
	...Enthalpy298Fonts
};
