import { CrimsonPro, EBGaramond, FZShuTi, FangSong } from "@assets/fonts";
import { SanCn } from "@assets/fonts";
import { Yoon } from "@assets/fonts";
import { color } from "@shared/config";
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
			fontFamily: CrimsonPro.italic,
		},
		b: {
			fontFamily: CrimsonPro.bold,
		},
		keyword: {
			fontFamily: CrimsonPro.boldItalic,
		},
		text: {
			fontFamily: CrimsonPro.regular,
		},
	},
	ru: {
		i: {
			fontFamily: EBGaramond.italic,
		},
		b: {
			fontFamily: EBGaramond.bold,
		},
		keyword: {
			fontFamily: EBGaramond.boldItalic,
		},
		text: {
			fontFamily: EBGaramond.regular,
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
		...localeComponentStyles,
		default: {
			...localeComponentStyles.default,
			icon: {
				fontSize: iconFontSize,
				lineHeight: iconFontSize * 1.3,
				top: ios ? 2 : 0,
			},
			icon_bullet: {
				lineHeight: fontSize * (ios ? 1 : 0.7),
				top: -3,
			},
			break: {
				height: fontSize * 2.7,
			},
			color: color.text,
		},
		ko: {
			...localeComponentStyles.ko,
			icon: {
				fontSize: iconFontSize * 0.85,
				letterSpacing: 2,
			},
		},
		ru: {
			...localeComponentStyles.ru,
			icon: {
				lineHeight: iconFontSize,
				top: ios ? -2 : 0,
			},
			icon_bullet: {
				top: -4,
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
