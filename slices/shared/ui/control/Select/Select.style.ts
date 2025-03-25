import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { StyleSheet } from "react-native";

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
		borderColor: color.light10,
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
});
