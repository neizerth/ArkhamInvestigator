import { type TextProps, View, type ViewStyle } from "react-native";
import { Text } from "../typography";

export type TextViewProps = TextProps & {
	contentContainerStyle?: ViewStyle;
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
