import { Arkhamic, STXinwei } from "@assets/fonts";
import { ArnoPro } from "@assets/fonts";
import { Conkordia } from "@assets/fonts";
import { SanCn } from "@assets/fonts";
import { STXingkai } from "@assets/fonts";
import { color, font } from "@shared/config";
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
	background: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	subtitle: ViewStyle;
	subtitleText: TextStyle;
	unique: TextStyle;
	id: TextStyle;
};

const ios = Platform.OS === "ios";

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
				paddingTop: "1%",
			},
		},
		seeker: {
			title: {
				paddingTop: "1%",
			},
		},
		mystic: {
			background: {
				gap: "6%",
			},
		},
	});

	const getKOStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			background: {
				gap: "11%",
			},
			title: {
				paddingTop: "2%",
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
		mystic: {
			background: {
				gap: "10%",
			},
		},
	});

	const getLocaleStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: defaultFactionStyle(faction),
		ru: {
			background: {
				gap: "7%",
			},
			title: {
				paddingTop: "1%",
			},
			titleText: {
				fontFamily: Conkordia.regular,
				fontSize: 43 * vh,
			},
			unique: {
				fontSize: 23 * vh,
			},
		},
		ko: getKOStyle(faction),
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
				paddingTop: "0.2%",
			},
		},
	});
	const factionStyle = getFactiionStyle(faction);

	const localeStyle = getLocaleStyle(language);

	const background: ViewStyle = {
		gap: "8%",
	};
	const container: ViewStyle = {
		height,
	};
	const title: ViewStyle = {
		gap: 2 * vh * font.scale,
		paddingTop: "0.5%",
		height: "57.5%",
	};
	const subtitle: ViewStyle = {
		height: "25%",
		paddingTop: "0.3%",
	};
	const titleText: TextStyle = {
		color: textColor,
	};
	const subtitleText: TextStyle = {
		color: textColor,
	};

	const unique: TextStyle = {
		marginTop: "1%",
		color: textColor,
	};

	const id: TextStyle = {
		color: color.dark10,
	};

	const base = {
		container,
		background,
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
