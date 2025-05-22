import { ArnoPro, STKaiti, STXinwei, SanCn, Yoon } from "@assets/fonts";
import { type KeyConfig, getKeyConfig } from "@shared/lib";
import type { TextStyle } from "react-native";
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

type Options = {
	language: string;
	small: boolean;
};

export const getScenarioEffectsStyle = ({ language, small }: Options) => {
	const iconFontSize = u(3.8);
	const fontSize = u(small ? 4 : 4.2);
	const lineHeight = fontSize * 1.1;

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

	const style: TextStyle = {
		fontSize,
		lineHeight,
	};

	return {
		componentStyles: getComponents(language),
		style,
	};
};
