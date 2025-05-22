import { ArnoPro, STKaiti, STXinwei, SanCn, Yoon } from "@assets/fonts";
import { type KeyConfig, getKeyConfig } from "@shared/lib";
import type { ComponentStyleMap } from "../../../game-text";
import { refUnit as u } from "../../lib";

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

export const getScenarioEffectsStyle = (language: string) => {
	const iconFontSize = u(3.8);
	const fontSize = u(4.5);

	const zhComponentStyles = {
		...localeComponentStyles.zh,
		icon: {
			letterSpacing: 2,
			fontSize: iconFontSize * 0.84,
		},
	};
	const getComponents = getKeyConfig({
		default: {
			...localeComponentStyles.default,
			icon: {
				fontSize: iconFontSize,
				lineHeight: iconFontSize * 1.2,
			},
			break: {
				height: fontSize * 2.7,
			},
		},
		ko: {
			...localeComponentStyles.ko,
			icon: {
				fontSize: iconFontSize * 0.85,
				letterSpacing: 2,
			},
		},
		zh: zhComponentStyles,
		"zh-cn": zhComponentStyles,
	});

	return getComponents(language);
};
