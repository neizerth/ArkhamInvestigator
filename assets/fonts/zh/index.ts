import { STKaitiFonts } from "./STKaiti";
import { STXingkaiFonts } from "./STXingkai";
import { STXinweiFonts } from "./STXinwei";
import { ZhenShuaiFonts } from "./ZhenShuai";

export * from "./STKaiti";
export * from "./STXingkai";
export * from "./STXinwei";
export * from "./ZhenShuai";

export default {
	...STKaitiFonts,
	...STXingkaiFonts,
	...STXinweiFonts,
	...ZhenShuaiFonts,
};
