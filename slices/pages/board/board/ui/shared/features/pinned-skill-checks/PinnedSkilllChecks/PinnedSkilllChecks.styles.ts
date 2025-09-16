import {
	Alegreya,
	CrimsonPro,
	FangSong,
	SanCn,
	SourceHanSansCN,
	Yoon,
} from "@assets/fonts";
import { color, font } from "@shared/config";
import { getKeyConfig } from "@shared/lib";
import type { ExpressionDisplayProps } from "@widgets/game/skill-check";

export const getExpressionDisplayStyle = (
	language?: string,
): Partial<ExpressionDisplayProps> => {
	const zhConfig = {
		fontFamily: FangSong.regular,
	};

	const getTextStyle = getKeyConfig({
		default: {
			color: color.text,
			fontSize: font.size.default,
			lineHeight: 20,
			fontFamily: CrimsonPro.regular,
		},
		ru: {
			fontFamily: Alegreya.regular,
		},
		ko: {
			fontFamily: Yoon.D330.regular,
			fontSize: 16,
		},
		zh: zhConfig,
		"zh-cn": zhConfig,
	});

	const zhValueConfig = {
		fontFamily: SourceHanSansCN.bold,
	};

	const getValueStyle = getKeyConfig({
		default: {
			fontFamily: CrimsonPro.bold,
		},
		ru: {
			fontFamily: Alegreya.bold,
		},
		ko: {
			fontFamily: SanCn.bold,
		},
		zh: zhValueConfig,
		"zh-cn": zhValueConfig,
	});

	const textStyle = getTextStyle(language);
	const valueStyle = getValueStyle(language);
	return {
		expressionStyle: {
			gap: 2,
		},
		statStyle: {
			fontSize: font.size.small,
		},
		textStyle,
		valueStyle,
	};
};
