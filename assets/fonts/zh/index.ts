import { STKaitiFonts } from "./STKaiti";
import { STXingkaiFonts } from "./STXingkai";
import { STXinweiFonts } from "./STXinwei";

export * from "./STKaiti";
export * from "./STXingkai";
export * from "./STXinwei";

export default {
	...STKaitiFonts,
	...STXingkaiFonts,
	...STXinweiFonts,
};
