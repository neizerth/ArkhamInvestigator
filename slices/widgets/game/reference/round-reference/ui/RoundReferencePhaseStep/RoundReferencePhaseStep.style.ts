import { ArnoPro, STKaiti, STXinwei, SanCn, Yoon } from "@assets/fonts";
import { type KeyConfig, getKeyConfig } from "@shared/lib";
import type { ComponentStyleMap } from "../../../../game-text";

const zhComponentStyles: ComponentStyleMap = {
	i: {
		fontFamily: STKaiti.italic,
	},
	b: {
		fontFamily: STXinwei.regular,
	},
	keyword: {
		fontFamily: STXinwei.regular,
	},
	text: {
		fontFamily: STKaiti.regular,
	},
};

export const localeComponentStyles: KeyConfig<ComponentStyleMap> = {
	default: {
		i: {
			fontFamily: ArnoPro.italic,
		},
		b: {
			fontFamily: ArnoPro.bold,
		},
		keyword: {
			fontFamily: ArnoPro.boldItalic,
		},
		text: {
			fontFamily: ArnoPro.regular,
		},
	},
	ko: {
		i: {
			fontFamily: Yoon.D330.italic,
		},
		b: {
			fontFamily: SanCn.bold,
		},
		keyword: {
			fontFamily: SanCn.boldItalic,
		},
		text: {
			fontFamily: Yoon.D330.regular,
		},
	},
	zh: zhComponentStyles,
	"zh-cn": zhComponentStyles,
};

export const getStepTextComponents = (language: string) => {
	return getKeyConfig(localeComponentStyles)(language);
};
