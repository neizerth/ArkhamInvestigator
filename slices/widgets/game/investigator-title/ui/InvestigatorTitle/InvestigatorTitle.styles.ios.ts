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
			title: {
				paddingTop: "2.3%",
			},
			container: {
				gap: "9%",
			},
		},
		mystic: {
			title: {
				paddingTop: "2%",
			},
		},
	});

	const getRUStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			container: {
				gap: "9%",
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
		seeker: {
			title: {
				paddingTop: "1.5%",
			},
			unique: {
				marginTop: "1%",
			},
		},
		rogue: {
			container: {
				gap: "8%",
			},
			title: {
				paddingTop: "1.5%",
			},
			unique: {
				marginTop: "1%",
			},
		},
		mystic: {
			container: {
				gap: "8%",
			},
		},
	});

	const getKOStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			container: {
				gap: "8%",
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
		neutral: {
			container: {
				gap: "10%",
			},
			title: {
				paddingTop: "1%",
			},
		},
	});

	const getZHStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			container: {
				gap: "7%",
			},
			title: {
				paddingTop: "1.5%",
			},
			titleText: {
				fontFamily: STXinwei.regular,
				fontSize: 38 * vh,
			},
			subtitleText: {
				fontFamily: STXingkai.regular,
				fontSize: 18 * vh,
			},
			unique: {
				marginTop: "0.5%",
			},
		},
		guardian: {
			unique: {
				marginTop: "1.5%",
			},
		},
		seeker: {
			title: {
				paddingTop: "2.5%",
			},
		},
		rogue: {
			container: {
				gap: "5%",
			},
		},
		neutral: {
			title: {
				paddingTop: "0.5%",
			},
			container: {
				gap: "8.5%",
			},
		},
	});

	const zhStyle = getZHStyle(faction);

	const getLocaleStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: defaultFactionStyle(faction),
		ru: getRUStyle(faction),
		ko: getKOStyle(faction),
		zh: zhStyle,
		"zh-cn": zhStyle,
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
				paddingTop: "0.7%",
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
		paddingTop: "0.8%",
	};
	const titleText: TextStyle = {
		color: textColor,
	};
	const subtitleText: TextStyle = {
		color: textColor,
	};

	const unique: TextStyle = {
		marginTop: "0%",
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
