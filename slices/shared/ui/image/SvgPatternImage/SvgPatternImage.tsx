import Svg, { Defs, Pattern, Rect } from "react-native-svg";
import type { SvgPatternImageProps } from "./SvgPatternImage.types";
import { getPatternProps } from "./getPatternProps";

const defaultOffset = {
	x: 0,
	y: 0,
};
export const SvgPatternImage = (props: SvgPatternImageProps) => {
	const {
		patternId,
		patternWidth,
		patternHeight,
		children,
		offset = defaultOffset,
		patternOffset = defaultOffset,
		...restProps
	} = props;
	const { width, height } = props;

	const viewBox = `0 0 ${width} ${height}`;

	const patternProps = getPatternProps(props);

	return (
		<Svg {...restProps} viewBox={viewBox}>
			<Defs>
				<Pattern
					id={patternId}
					patternUnits="userSpaceOnUse"
					patternContentUnits="userSpaceOnUse"
					{...patternOffset}
					{...patternProps}
				>
					{children}
				</Pattern>
			</Defs>
			<Rect
				fill={`url(#${patternId})`}
				{...offset}
				width={width}
				height={height}
			/>
		</Svg>
	);
};
