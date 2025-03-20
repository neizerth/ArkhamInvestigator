import type { Point } from "@shared/model";
import type { SvgProps } from "react-native-svg";

export type SvgPatternImageProps = SvgProps & {
	width: number;
	height: number;
	patternId: string;
	patternWidth: number;
	patternHeight: number;
	resizeMode?: "stretch" | "repeat";
	patternOffset?: Point;
	offset?: Point;
};
