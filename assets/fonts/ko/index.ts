import { LineSeedKRFonts } from "./LineSeedKR";
import { SanCnFonts } from "./SanCn";
import { YoonFonts } from "./Yoon";

export * from "./SanCn";
export * from "./Yoon";
export * from "./LineSeedKR";

export default {
	...SanCnFonts,
	...YoonFonts,
	...LineSeedKRFonts,
};
