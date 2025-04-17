import { ArnoPro, STKaiti, STXinwei } from "@assets/fonts";
import { SanCn } from "@assets/fonts";
import { Yoon } from "@assets/fonts";
import { type KeyConfig, getKeyConfig } from "@shared/lib";
import type { ComponentStyleMap } from "@widgets/game/game-text";
import type { TextStyle } from "react-native";
import { boardText } from "../../../../config";

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

type GetComponentStylesOptions = {
	language: string;
	unit: number;
};

export const getInvestigatorTextStyle = ({
	language,
	unit,
}: GetComponentStylesOptions) => {
	const iconFontSize = unit * boardText.ratio.icon;
	const fontSize = unit * boardText.ratio.text;

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

	const componentStyles = getComponents(language) as ComponentStyleMap;

	const getStyle = getKeyConfig<TextStyle>({
		default: {
			fontSize,
			lineHeight: fontSize * 1.15,
		},
		ko: {
			fontSize: fontSize * 0.95,
		},
	});

	const style = getStyle(language);

	return {
		componentStyles,
		style,
	};
};
