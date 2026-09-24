import { selectPickerScale } from "@modules/core/control/entities/picker/lib";
import { useAppSelector } from "@shared/lib";
import type { PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { backgroundByStat } from "./StatFigure.components";
import { getFigureSize, getFigureStyle } from "./StatFigure.styles";
import type { StatFigureType, StatSize } from "./StatFigure.types";

export type StatFigureProps = PropsWithChildren & {
	stat: StatFigureType;
	size?: StatSize;
	style?: ViewProps["style"];
};

/**
 * The game asset of a stat, sized by the size token and the asset ratio, with whatever
 * the caller draws inside it.
 */
export const StatFigure = ({
	stat,
	size = "small",
	children,
	style,
}: StatFigureProps) => {
	const Background = backgroundByStat[stat];
	const scale = useAppSelector(selectPickerScale);

	const figureSize = getFigureSize({ stat, size, scale });
	const figureStyle = getFigureStyle(size, figureSize);

	return (
		<Background
			testID={`${stat}-background`}
			style={[figureStyle, style]}
			imageStyle={figureSize}
		>
			{children}
		</Background>
	);
};
