import { ArnoPro, STKaiti, Yoon } from "@assets/fonts";
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
			fontFamily: STKaiti.italic,
			fontSize: fontSize * 0.9,
		},
		u: {
			fontFamily: STKaiti.regular,
		},
	};

	const getComponents = getKeyConfig({
		default: {
			paragraph: {
				justifyContent: "center",
			},
			text: {
				fontFamily: ArnoPro.italic,
				fontSize,
				lineHeight: fontSize * 1.15,
				textAlign: "center",
			},
			b: {
				fontFamily: ArnoPro.boldItalic,
			},
			u: {
				fontFamily: ArnoPro.regular,
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
