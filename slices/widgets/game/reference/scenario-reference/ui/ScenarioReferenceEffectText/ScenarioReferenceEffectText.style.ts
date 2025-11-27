import {
	CrimsonPro,
	EBGaramond,
	FZShuTi,
	FangSong,
	SanCn,
	SourceHanSansCN,
	Yoon,
} from "@assets/fonts";
import { type KeyConfig, getKeyConfig } from "@shared/lib/util";
import type { ComponentStyleMap } from "@shared/ui";
import type { TextStyle } from "react-native";
import { refUnit as u } from "../../lib";

const zhComponentStyles: ComponentStyleMap = {
	i: {
		fontFamily: FangSong.italic,
	},
	b: {
		fontFamily: SourceHanSansCN.bold,
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

type Options = {
	language: string;
	small: boolean;
	align?: "left" | "right";
};

export const getScenarioEffectsStyle = ({
	language,
	small,
	align = "left",
}: Options) => {
	const iconFontSize = u(3.8);
	const fontSize = u(small ? 3.5 : 4.2);

	const zhComponentStyles = {
		...localeComponentStyles.zh,
		icon: {
			letterSpacing: 2,
			fontSize: iconFontSize * 0.84,
		},
	};
	const getComponents = getKeyConfig({
		...localeComponentStyles,
		default: {
			...localeComponentStyles.default,
			icon: {
				fontSize: iconFontSize,
				lineHeight: iconFontSize * 1.2,
			},
			break: {
				height: fontSize * 2.7,
			},
			paragraph: {
				justifyContent: align === "right" ? "flex-end" : "flex-start",
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

	const style = getKeyConfig<TextStyle>({
		default: {
			fontSize,
			lineHeight: fontSize * 1.1,
		},
		ko: {
			lineHeight: fontSize * 1.3,
		},
		zh: {
			lineHeight: fontSize * 1.2,
		},
		"zh-cn": {
			lineHeight: fontSize * 1.2,
		},
	})(language);

	return {
		componentStyles: getComponents(language),
		style,
	};
};
