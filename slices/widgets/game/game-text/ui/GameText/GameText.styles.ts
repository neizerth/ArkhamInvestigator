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
		top: 1,
		marginRight: 2,
		fontSize: 14,
	},
	paragraph: {},
	break: {
		height: 32,
	},
	text: {},
};
