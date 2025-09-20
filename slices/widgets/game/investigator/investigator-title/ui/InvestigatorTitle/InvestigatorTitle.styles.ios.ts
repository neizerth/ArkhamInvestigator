import { Arkhamic, CrimsonPro, EBGaramond, FZLiBian } from "@assets/fonts";
import { Conkordia } from "@assets/fonts";
import { SanCn } from "@assets/fonts";
import { color, font } from "@shared/config";
import { getKeyConfig } from "@shared/lib";
import type { PropsWithFaction } from "@shared/model";
import { mergeDeepRight } from "ramda";
import type { TextStyle, ViewStyle } from "react-native";

type GetTitleStyleOptions = PropsWithFaction & {
	height: number;
	language?: string;
	parallel?: boolean;
};

type ReturnStyle = {
	background: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	subtitle: ViewStyle;
	subtitleText: TextStyle;
	unique: TextStyle;
	id: TextStyle;
};

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
				fontFamily: CrimsonPro.bold,
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
			background: {
				gap: "2%",
			},
		},
		neutral: {
			background: {
				gap: "10%",
			},
		},
		mystic: {
			title: {
				paddingTop: "2%",
			},
			background: {
				gap: "2%",
			},
		},
	});

	const getRUStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			background: {
				gap: "4%",
			},
			title: {
				paddingTop: "1%",
			},
			titleText: {
				fontFamily: Conkordia.regular,
				fontSize: 43 * vh,
			},
			subtitleText: {
				fontFamily: EBGaramond.bold,
			},
			unique: {
				fontSize: 23 * vh,
			},
			subtitle: {
				paddingTop: "1.9%",
			},
		},
		seeker: {
			title: {
				paddingTop: "1.5%",
			},
			unique: {
				marginTop: "1%",
			},
			background: {
				gap: "2%",
			},
		},
		rogue: {
			background: {
				gap: "3%",
			},
			title: {
				paddingTop: "1.5%",
			},
			unique: {
				marginTop: "1%",
			},
		},
		mystic: {
			background: {
				gap: "2%",
			},
		},
		neutral: {
			background: {
				gap: "10%",
			},
		},
	});

	const getKOStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			background: {
				gap: "6%",
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
		seeker: {
			background: {
				gap: "8%",
			},
		},
		rogue: {
			background: {
				gap: "4%",
			},
		},
		mystic: {
			background: {
				gap: "4%",
			},
		},
		survivor: {
			background: {
				gap: "4%",
			},
		},
		neutral: {
			background: {
				gap: "10%",
			},
			title: {
				paddingTop: "1%",
			},
		},
	});

	const getZHStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			background: {
				gap: "6%",
			},
			title: {
				paddingTop: "1.5%",
			},
			titleText: {
				fontFamily: FZLiBian.regular,
				fontSize: 38 * vh,
			},
			subtitleText: {
				fontFamily: FZLiBian.regular,
				fontSize: 28 * vh,
			},
			unique: {
				marginTop: "0.5%",
			},
		},
		guardian: {
			unique: {
				marginTop: "1.5%",
			},
			background: {
				gap: "3%",
			},
		},
		seeker: {
			title: {
				paddingTop: "1.5%",
			},
		},
		rogue: {
			background: {
				gap: "3%",
			},
		},
		mystic: {
			title: {
				paddingTop: "1%",
			},
			background: {
				gap: "1%",
			},
		},
		survivor: {
			title: {
				paddingTop: "1%",
			},
			background: {
				gap: "2%",
			},
		},
		neutral: {
			title: {
				paddingTop: "0.5%",
			},
			background: {
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
				paddingTop: "2%",
			},
		},
	});
	const factionStyle = getFactiionStyle(faction);

	const localeStyle = getLocaleStyle(language);

	const background: ViewStyle = {
		gap: "8%",
	};
	const title: ViewStyle = {
		gap: 2 * vh * font.scale,
		paddingTop: "0.5%",
		height: "57.5%",
	};
	const subtitle: ViewStyle = {
		height: "30%",
		paddingTop: "2.3%",
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
