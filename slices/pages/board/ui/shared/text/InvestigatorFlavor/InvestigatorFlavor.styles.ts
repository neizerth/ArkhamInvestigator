import { boardText } from "@pages/board/config";
import { ArnoPro, STKaiti, Yoon } from "@shared/fonts";
import { getKeyConfig } from "@shared/lib";

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
			fontFamily: STKaiti.italic,
			fontSize: fontSize * 0.9,
		},
	};

	const getComponents = getKeyConfig({
		default: {
			text: {
				fontFamily: ArnoPro.italic,
				fontSize,
				lineHeight: fontSize * 1.15,
				textAlign: "center",
			},
			b: {
				fontFamily: ArnoPro.boldItalic,
			},
		},
		ko: {
			text: {
				fontFamily: Yoon.D330.italic,
				fontSize: fontSize * 0.9,
			},
		},
		zh: zhComponentStyles,
		"zh-cn": zhComponentStyles,
	});

	return getComponents(language);
};
