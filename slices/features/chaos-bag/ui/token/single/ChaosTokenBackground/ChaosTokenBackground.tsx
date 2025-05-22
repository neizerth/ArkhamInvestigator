import { View } from "react-native";
import { RadialGradient } from "react-native-gradients";
import type { SvgProps } from "react-native-svg";
import type { ChaosTokenType } from "../../../../model";
import { getChaosTokenGradient } from "./ChaosTokenBackground.styles";

export type ChaosTokenBackgroundProps = SvgProps & {
	type: ChaosTokenType;
};

export const ChaosTokenBackground = ({
	type,
	style,
	...props
}: ChaosTokenBackgroundProps) => {
	const colorList = getChaosTokenGradient(type);
	return (
		<View style={style}>
			<RadialGradient
				{...props}
				x="50%"
				y="50%"
				rx="50%"
				ry="50%"
				colorList={colorList}
			/>
		</View>
	);
};
