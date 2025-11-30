import {
	CrimsonPro,
	EBGaramond,
	FangSong,
	SanCn,
	SourceHanSansCN,
	Yoon,
} from "@assets/fonts";
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
			paragraph: {
				justifyContent: type === "end" ? "center" : "flex-start",
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
	})(language);
};
