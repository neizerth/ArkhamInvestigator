import type { TouchableOpacityProps } from "@features/haptic";
import type { SkillCheckItem } from "@shared/model";
import type { TextProps, ViewProps } from "react-native";

export type SkillCheckExpressionDisplayProps = TouchableOpacityProps & {
	data: SkillCheckItem[];
	value?: number;
	expressionStyle?: ViewProps["style"];
	statStyle?: TextProps["style"];
	textStyle?: TextProps["style"];
	equalsStyle?: TextProps["style"];
	equalsContainerStyle?: ViewProps["style"];
	showDiff?: boolean;
};
