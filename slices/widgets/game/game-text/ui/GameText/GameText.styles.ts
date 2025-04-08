import { Alegreya } from "@shared/fonts";
import type { ComponentStyleMap } from "@widgets/game/game-text/model";

export const defaultComponentStyles: ComponentStyleMap = {
	i: {
		fontFamily: Alegreya.regular,
	},
	b: {
		fontFamily: Alegreya.bold,
	},
	keyword: {
		fontFamily: Alegreya.boldItalic,
	},
	u: {
		fontFamily: Alegreya.regular,
	},
	icon: {
		fontSize: 14,
		lineHeight: 16,
	},
	iconToken: {},
	paragraph: {},
	word: {
		alignItems: "flex-end",
	},
	break: {
		height: 32,
	},
	text: {},
};
