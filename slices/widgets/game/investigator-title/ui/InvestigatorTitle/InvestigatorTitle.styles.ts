import { color, font } from "@shared/config";
import { Arkhamic, STXinwei } from "@shared/fonts";
import { ArnoPro } from "@shared/fonts";
import { Conkordia } from "@shared/fonts";
import { SanCn } from "@shared/fonts";
import { STXingkai } from "@shared/fonts";
import { getKeyConfig } from "@shared/lib";
import type { PropsWithFaction } from "@shared/model";
import { mergeDeepRight } from "ramda";
import { Platform, type TextStyle, type ViewStyle } from "react-native";

type GetTitleStyleOptions = PropsWithFaction & {
	height: number;
	language?: string;
	parallel?: boolean;
};

type ReturnStyle = {
	container: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	subtitle: ViewStyle;
	subtitleText: TextStyle;
	unique: TextStyle;
	id: TextStyle;
};

const ios = Platform.OS === "ios";

const titlePaddingOffset = ios ? 0.5 : 0;

export const getTitleStyle = (options: GetTitleStyleOptions) => {
	const { height, language, faction, parallel } = options;
	const vh = height / 100;
	const textColor = parallel ? color.white : color.text;

	const zhConfig = {
		titleText: {
			fontFamily: STXinwei.regular,
			fontSize: 38 * vh,
		},
		subtitleText: {
			fontFamily: STXingkai.regular,
			fontSize: 18 * vh,
		},
	};

	const defaultFactionStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			titleText: {
				fontFamily: Arkhamic.regular,
				fontSize: 45 * vh,
			},
			subtitleText: {
				fontFamily: ArnoPro.bold,
				fontSize: 22 * vh,
			},
			id: {
				fontSize: 30 * vh,
			},
			unique: {
				fontSize: 25 * vh,
			},
		},
		rogue: {
			title: {
				paddingTop: `${1 + titlePaddingOffset}%`,
			},
		},
		seeker: {
			title: {
				paddingTop: `${1 + titlePaddingOffset}%`,
			},
		},
	});

	const getLocaleStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: defaultFactionStyle(faction),
		ru: {
			container: {
				gap: ios ? "8%" : "7%",
			},
			title: {
				paddingTop: `${1 + titlePaddingOffset}%`,
			},
			titleText: {
				fontFamily: Conkordia.regular,
				fontSize: 43 * vh,
			},
			unique: {
				fontSize: 23 * vh,
			},
		},
		ko: {
			container: {
				gap: ios ? "8%" : "12%",
			},
			title: {
				paddingTop: ios ? "1%" : `${2 + titlePaddingOffset}%`,
			},
			titleText: {
				fontFamily: SanCn.bold,
				fontSize: 38 * vh,
			},
			subtitleText: {
				fontFamily: SanCn.bold,
				fontSize: 20 * vh,
			},
			unique: {
				marginTop: 0,
			},
		},
		zh: zhConfig,
		"zh-cn": zhConfig,
	});

	const getFactiionStyle = getKeyConfig({
		default: {},
		neutral: {
			subtitle: {
				paddingTop: 1,
			},
		},
		seeker: {
			subtitle: {
				paddingTop: `${0.2 + titlePaddingOffset}%`,
			},
		},
	});
	const factionStyle = getFactiionStyle(faction);

	const localeStyle = getLocaleStyle(language);

	const container: ViewStyle = {
		gap: "8%",
	};
	const title: ViewStyle = {
		gap: 2 * vh * font.scale,
		paddingTop: "0.5%",
		height: "57.5%",
	};
	const subtitle: ViewStyle = {
		height: "25%",
		paddingTop: `${0.3 + titlePaddingOffset}%`,
	};
	const titleText: TextStyle = {
		color: textColor,
	};
	const subtitleText: TextStyle = {
		color: textColor,
	};

	const unique: TextStyle = {
		marginTop: ios ? "0%" : "1%",
		color: textColor,
	};

	const id: TextStyle = {
		color: color.dark10,
	};

	const base = {
		container,
		title,
		titleText,
		subtitle,
		subtitleText,
		unique,
		id,
	};

	return mergeDeepRight(
		mergeDeepRight(base, localeStyle),
		factionStyle,
	) as ReturnStyle;
};

export const titleStyle = {
	width: 618,
	height: 107,
	ratio: 618 / 107,
};
