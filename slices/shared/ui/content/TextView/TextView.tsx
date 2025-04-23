import { type TextProps, View, type ViewProps } from "react-native";
import { Text } from "../typography";

export type TextViewProps = TextProps & {
	contentContainerStyle?: ViewProps["style"];
};

export const TextView = ({
	contentContainerStyle,
	...props
}: TextViewProps) => {
	return (
		<View style={contentContainerStyle}>
			<Text {...props} />
		</View>
	);
};
