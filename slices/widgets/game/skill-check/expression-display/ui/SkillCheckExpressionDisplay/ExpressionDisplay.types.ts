import type { SkillCheckItem } from "@shared/model";
import type { TextProps, ViewProps } from "react-native";

export type SkillCheckExpressionDisplayProps = ViewProps & {
	data: SkillCheckItem[];
	value?: number;
	expressionStyle?: ViewProps["style"];
	statStyle?: TextProps["style"];
	textStyle?: TextProps["style"];
	equalsStyle?: TextProps["style"];
	valueStyle?: TextProps["style"];
	equalsContainerStyle?: ViewProps["style"];
	signStyle?: TextProps["style"];
	showDiff?: boolean;
};
