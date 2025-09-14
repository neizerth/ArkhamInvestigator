import { ArnoPro, FZShuTi, FangSong } from "@assets/fonts";
import { SanCn } from "@assets/fonts";
import { Yoon } from "@assets/fonts";
import { type KeyConfig, getKeyConfig } from "@shared/lib";
import type { ComponentStyleMap } from "@shared/ui";
import { Platform, type TextStyle } from "react-native";
import { boardText } from "../../config";

const ios = Platform.OS === "ios";

const zhComponentStyles: ComponentStyleMap = {
	i: {
		fontFamily: FangSong.italic,
	},
	b: {
		fontFamily: FZShuTi.regular,
	},
	keyword: {
		fontFamily: FZShuTi.regular,
	},
	text: {
		fontFamily: FangSong.regular,
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
		icon_bullet: {
			fontSize: iconFontSize,
			top: -5,
		},
		colonIcon: {
			top: 2,
		},
	};
	const getComponents = getKeyConfig({
		default: {
			...localeComponentStyles.default,
			icon: {
				fontSize: iconFontSize,
				lineHeight: iconFontSize * 1.2,
				top: -1,
			},
			icon_bullet: {
				lineHeight: fontSize * (ios ? 1 : 0.7),
				top: -7,
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
