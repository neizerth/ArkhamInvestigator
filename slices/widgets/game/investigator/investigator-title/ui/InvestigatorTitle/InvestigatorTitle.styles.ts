import {
	Arkhamic,
	Conkordia,
	CrimsonPro,
	EBGaramond,
	FZLiBian,
	SanCn,
} from "@assets/fonts";
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
	container: ViewStyle;
	background: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	titleContent: ViewStyle;
	arrow: ViewStyle;
	subtitle: ViewStyle;
	subtitleText: TextStyle;
	unique: TextStyle;
	id: TextStyle;
};

export const getTitleStyle = (options: GetTitleStyleOptions) => {
	const { height, language, faction, parallel } = options;
	const vh = height / 100;
	const textColor = parallel ? color.white : color.text;

	const zhConfig: Partial<ReturnStyle> = {
		background: {
			gap: "6%",
		},
		titleText: {
			paddingTop: "1%",
			fontFamily: FZLiBian.regular,
			fontSize: 38 * vh,
		},
		subtitleText: {
			fontFamily: FZLiBian.regular,
			fontSize: 28 * vh,
		},
	};

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
		},
		guardian: {
			background: {
				gap: parallel ? "8%" : "6%",
			},
		},
		rogue: {
			title: {
				paddingTop: "1%",
			},
			background: {
				gap: "5%",
			},
		},
		seeker: {
			title: {
				paddingTop: "1%",
			},
			arrow: {
				paddingTop: "2%",
			},
		},
		mystic: {
			background: {
				gap: "4%",
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

	const getRUStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: {
			background: {
				gap: "3%",
			},
			title: {
				paddingTop: "1.5%",
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
				marginTop: 0,
			},
		},
		guardian: {
			background: {
				gap: parallel ? "7%" : "3%",
			},
		},
		seeker: {
			title: {
				paddingTop: "2%",
			},
			background: {
				gap: "4%",
			},
		},
	});

	const getLocaleStyle = getKeyConfig<Partial<ReturnStyle>>({
		default: defaultFactionStyle(faction),
		ru: getRUStyle(faction),
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
		gap: "6%",
	};
	const container: ViewStyle = {
		height,
	};
	const title: ViewStyle = {
		paddingTop: "0.5%",
		height: "57.5%",
	};
	const subtitle: ViewStyle = {
		height: "30%",
		paddingTop: "0.3%",
	};
	const titleContent: ViewStyle = {
		gap: 2 * vh * font.scale,
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
		titleContent,
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
