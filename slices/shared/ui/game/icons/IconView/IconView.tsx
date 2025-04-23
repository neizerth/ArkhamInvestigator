import { View, type ViewProps } from "react-native";
import { Icon, type IconProps } from "../Icon/Icon";

export type IconViewProps = IconProps & {
	contentContainerStyle?: ViewProps["style"];
};

export const IconView = ({
	contentContainerStyle,
	...props
}: IconViewProps) => {
	return (
		<View style={contentContainerStyle}>
			<Icon {...props} />
		</View>
	);
};
