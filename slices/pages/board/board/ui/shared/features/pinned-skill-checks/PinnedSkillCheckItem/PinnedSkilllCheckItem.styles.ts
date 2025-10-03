import { CrimsonPro, EBGaramond, FangSong, Yoon } from "@assets/fonts";
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
			fontFamily: EBGaramond.regular,
		},
		ko: {
			fontFamily: Yoon.D330.regular,
			fontSize: 16,
		},
		zh: zhConfig,
		"zh-cn": zhConfig,
	});

	const textStyle = getTextStyle(language);
	return {
		expressionStyle: {
			gap: 2,
		},
		statStyle: {
			fontSize: font.size.small,
		},
		textStyle,
	};
};
