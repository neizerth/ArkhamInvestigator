import Svg, {
	FeGaussianBlur,
	Filter,
	Rect,
	type SvgProps,
} from "react-native-svg";

export type RoundReferencePhaseBackgroundProps = SvgProps & {
	backgroundColor: string;
	offsetX?: string | number;
	offsetY?: string | number;
	rectWidth?: string | number;
	rectHeight?: string | number;
};

export const RoundReferencePhaseBackground = ({
	backgroundColor,
	offsetX = "3%",
	offsetY = "3%",
	rectHeight = "94%",
	rectWidth = "94%",
	...props
}: RoundReferencePhaseBackgroundProps) => {
	return (
		<Svg {...props} height="100%" width="100%">
			<Filter id="blurry">
				<FeGaussianBlur stdDeviation="25" in="SourceGraphic" />
			</Filter>

			<Rect
				x={offsetX}
				y={offsetY}
				width={rectWidth}
				height={rectHeight}
				filter="url(#blurry)"
				fill={backgroundColor}
			/>
		</Svg>
	);
};
