import { fontCategory } from "@assets/fonts";
import type { FontFamilyFonts } from "@shared/model";

export const getLocaleFonts = (language: string): FontFamilyFonts => {
	if (fontCategory[language]) {
		return {
			...fontCategory[language],
			...fontCategory.common,
		};
	}
	if (language === "zh-cn") {
		return getLocaleFonts("zh");
	}
	return fontCategory.common;
};
