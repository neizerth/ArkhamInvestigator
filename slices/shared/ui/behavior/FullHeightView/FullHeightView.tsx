import { selectNavbarHeight } from "@modules/core/device/shared/lib";
import { Dimensions, View, type ViewProps } from "react-native";
import { useAppSelector } from "../../../lib/hooks/store/useAppSelector";

export type FullHeightViewProps = ViewProps;

const { height } = Dimensions.get("screen");

export const FullHeightView = (props: FullHeightViewProps) => {
	const navbarHeight = useAppSelector(selectNavbarHeight);
	const style = {
		minHeight: height - navbarHeight,
	};

	return <View {...props} style={[props.style, style]} />;
};
