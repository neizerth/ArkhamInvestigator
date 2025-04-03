import type { ViewStyle } from "react-native";

export const getSkillsStyle = (width: number): ViewStyle => {
	const vw = width / 100;
	return {
		paddingLeft: vw * 5,
		paddingRight: vw * 5,
		paddingTop: vw * 2,
		paddingBottom: vw * 2.5,
		gap: 4 * vw,
	};
};

export const skillsStyle = {
	width: 510,
	height: 107,
	ratio: 510 / 107,
	marginLeft: -20,
	padding: {
		horizontal: 12 / 510,
		vertical: 26 / 510,
	},
};
