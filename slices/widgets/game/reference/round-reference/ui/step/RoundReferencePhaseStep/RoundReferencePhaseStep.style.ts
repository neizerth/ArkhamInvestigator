import { ArnoPro, STKaiti, STXinwei, SanCn, Yoon } from "@assets/fonts";
import type { ComponentStyleMap } from "@entities/game-text";
import type { TimingPhaseStepType } from "@features/game/rules";
import { getKeyConfig } from "@shared/lib";

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

type Options = {
	language: string;
	type: TimingPhaseStepType;
};

export const getStepTextComponents = ({ language, type }: Options) => {
	return getKeyConfig({
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
			paragraph: {
				justifyContent: type === "end" ? "center" : "flex-start",
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
	})(language);
};
