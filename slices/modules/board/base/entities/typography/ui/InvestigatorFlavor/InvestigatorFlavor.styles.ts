import { Alegreya, CrimsonPro, FangSong, Yoon } from "@assets/fonts";
import { getKeyConfig } from "@shared/lib";
import { boardText } from "../../config";

export type GetStylesOptions = {
	language: string;
	unit: number;
};

export const getInvestigatorFlavorStyles = ({
	language,
	unit,
}: GetStylesOptions) => {
	const fontSize = unit * boardText.ratio.text;

	const zhComponentStyles = {
		text: {
			fontFamily: FangSong.italic,
			fontSize: fontSize * 0.9,
		},
		u: {
			fontFamily: FangSong.regular,
		},
	};

	const getComponents = getKeyConfig({
		default: {
			paragraph: {
				justifyContent: "center",
			},
			text: {
				fontFamily: CrimsonPro.italic,
				fontSize,
				lineHeight: fontSize * 1.15,
				textAlign: "center",
			},
			b: {
				fontFamily: CrimsonPro.boldItalic,
			},
			u: {
				fontFamily: CrimsonPro.regular,
			},
		},
		ru: {
			text: {
				fontFamily: Alegreya.italic,
			},
			b: {
				fontFamily: Alegreya.boldItalic,
			},
			u: {
				fontFamily: Alegreya.regular,
			},
		},
		ko: {
			text: {
				fontFamily: Yoon.D330.italic,
				fontSize: fontSize * 0.9,
			},
			u: {
				fontFamily: Yoon.D330.regular,
			},
		},
		zh: zhComponentStyles,
		"zh-cn": zhComponentStyles,
	});

	return getComponents(language);
};
