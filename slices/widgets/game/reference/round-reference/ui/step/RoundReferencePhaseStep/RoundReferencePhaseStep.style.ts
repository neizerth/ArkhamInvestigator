import { ArnoPro, FangSong, SanCn, SourceHanSansCN, Yoon } from "@assets/fonts";
import type { TimingPhaseStepType } from "@modules/mechanics/rules/round-timing/shared/model";
import { getKeyConfig } from "@shared/lib";
import type { ComponentStyleMap } from "@shared/ui";

const zhComponentStyles: ComponentStyleMap = {
	i: {
		fontFamily: FangSong.italic,
	},
	b: {
		fontFamily: SourceHanSansCN.bold,
	},
	keyword: {
		fontFamily: SourceHanSansCN.bold,
	},
	text: {
		fontFamily: FangSong.regular,
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
