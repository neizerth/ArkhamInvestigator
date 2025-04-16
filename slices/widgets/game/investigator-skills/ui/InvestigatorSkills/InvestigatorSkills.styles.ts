import type { ViewStyle } from "react-native";
const { round: rnd } = Math;
export const getSkillsStyle = (width: number): ViewStyle => {
	const vw = width / 100;
	return {
		paddingLeft: rnd(vw * 5),
		paddingRight: rnd(vw * 5),
		paddingTop: rnd(vw * 2),
		paddingBottom: rnd(vw * 2.5),
		gap: Math.floor(4 * vw),
	};
};

export const skillsStyle = {
	width: 510,
	height: 110,
	ratio: 510 / 110,
	marginLeft: -20,
	padding: {
		horizontal: 12 / 510,
		vertical: 26 / 510,
	},
};
