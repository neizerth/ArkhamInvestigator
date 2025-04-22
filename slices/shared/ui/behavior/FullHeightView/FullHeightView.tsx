import { Dimensions, View, type ViewProps } from "react-native";
export type FullHeightViewProps = ViewProps;

const { height } = Dimensions.get("screen");

export const FullHeightView = (props: FullHeightViewProps) => {
	const style = {
		minHeight: height,
	};

	return <View {...props} style={[props.style, style]} />;
};
