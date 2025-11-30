import type { InvestigatorBoardNumericStat } from "@shared/model";
import { type StyleProp, StyleSheet, type TextStyle } from "react-native";
import { font } from "../../../../config";

type Options = {
	statType: InvestigatorBoardNumericStat;
	style?: StyleProp<TextStyle>;
};
export const getIconStyle = ({
	statType,
	style,
}: Options): TextStyle | undefined => {
	if (isSkill(statType)) {
		return;
	}

	const { fontSize = font.size.default } = StyleSheet.flatten(style);

	const translateX = -fontSize * 0.1;
	const translateY = -fontSize * 0.1;

	return {
		fontSize: fontSize * 0.8,
		transform: [
			{
				translateX,
			},
			{
				translateY,
			},
		],
	};
};

export const isSkill = (type: InvestigatorBoardNumericStat) => {
	return ["willpower", "agility", "combat", "intellect"].includes(type);
};
