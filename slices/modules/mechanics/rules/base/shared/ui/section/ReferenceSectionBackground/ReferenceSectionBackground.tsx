import { useId } from "react";
import { Platform } from "react-native";
import Svg, {
	FeGaussianBlur,
	Filter,
	Rect,
	type SvgProps,
} from "react-native-svg";

const ios = Platform.OS === "ios";

export type ReferenceSectionBackgroundProps = SvgProps & {
	backgroundColor: string;
	offsetX?: string | number;
	offsetY?: string | number;
	rectWidth?: string | number;
	rectHeight?: string | number;
	deviation?: number;
};

export const ReferenceSectionBackground = ({
	backgroundColor,
	offsetX = "3%",
	offsetY = "3%",
	rectHeight = "94%",
	rectWidth = "94%",
	height = "100%",
	width = "100%",
	deviation = ios ? 4 : 25,
	...props
}: ReferenceSectionBackgroundProps) => {
	const id = useId();
	return (
		<Svg {...props} height={height} width={width}>
			<Filter id={id}>
				<FeGaussianBlur stdDeviation={deviation} in="SourceGraphic" />
			</Filter>

			<Rect
				x={offsetX}
				y={offsetY}
				width={rectWidth}
				height={rectHeight}
				filter={`url(#${id})`}
				fill={backgroundColor}
			/>
		</Svg>
	);
};
