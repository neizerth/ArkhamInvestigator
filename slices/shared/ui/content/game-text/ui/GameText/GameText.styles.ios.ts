import { Alegreya } from "@assets/fonts";
import type { ComponentStyleMap } from "../../model";

export const defaultComponentStyles: ComponentStyleMap = {
	i: {
		fontFamily: Alegreya.italic,
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
	old: {
		fontFamily: Alegreya.regular,
		opacity: 0.7,
	},
	icon: {
		fontSize: 14,
		lineHeight: 16,
		top: -2,
	},
	icon_bullet: {
		top: -4,
	},
	iconToken: {},
	paragraph: {},
	word: {
		alignItems: "flex-end",
	},
	break: {
		height: 32,
	},
	text: {
		fontFamily: Alegreya.regular,
	},
};
