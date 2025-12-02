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
		top: -3,
	},
	icon_bullet: {
		top: -6,
	},
	iconToken: {},
	paragraph: {},
	img: {},
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
