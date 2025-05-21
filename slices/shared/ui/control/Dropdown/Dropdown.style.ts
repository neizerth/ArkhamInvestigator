import { Alegreya } from "@assets/fonts";
import { StyleSheet } from "react-native";
import { color, font, size } from "../../../config";

export const styles = StyleSheet.create({
	selectedTextStyle: {
		color: color.light10,
		fontFamily: Alegreya.regular,
		fontSize: font.size.default,
	},
	item: {},
	dropdown: {
		backgroundColor: color.dark30,
		paddingHorizontal: size.gap.small,
		paddingVertical: size.gap.default,
		borderRadius: size.borderRadius.default,
	},
	container: {
		backgroundColor: color.dark30,
		borderRadius: size.borderRadius.default,
		borderColor: color.gray20,
		overflow: "hidden",
	},
	itemTextStyle: {
		color: color.light10,
		fontFamily: Alegreya.regular,
		fontSize: font.size.default,
	},
	selectedStyle: {
		backgroundColor: color.dark20,
	},
	placeholderStyle: {
		color: color.dark10,
		fontFamily: Alegreya.regular,
		fontSize: font.size.default,
	},
	inputSearchStyle: {
		borderColor: color.dark10,
		borderRadius: size.borderRadius.default,
		fontSize: font.size.medium,
		fontFamily: Alegreya.regular,
		color: color.light10,
	},
});
