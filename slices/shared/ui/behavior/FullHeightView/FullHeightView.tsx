import { Dimensions, View, type ViewProps } from "react-native";
import { navBarHeight } from "../../../config";
export type FullHeightViewProps = ViewProps;

const { height } = Dimensions.get("screen");

export const FullHeightView = (props: FullHeightViewProps) => {
	const style = {
		minHeight: height - navBarHeight,
	};

	return <View {...props} style={[props.style, style]} />;
};
