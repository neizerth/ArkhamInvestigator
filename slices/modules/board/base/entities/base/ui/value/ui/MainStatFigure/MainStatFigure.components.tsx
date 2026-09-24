import { View } from "react-native";
import styled from "styled-components/native";
import { type StatSize, statStyles } from "../StatFigure";
import { mainStatSizes, mainStatStyles } from "./MainStatFigure.styles";
import type { MainStatType } from "./MainStatFigure.types";

const createComponents = (stat: MainStatType, size: StatSize) => {
	const { initialRight } = mainStatStyles[stat];
	const { initialBottom, initialBehind } = mainStatSizes[size];
	const { color } = statStyles[stat];

	const Initial: typeof View = styled(View).attrs({
		testID: `${stat}-initial`,
	})`
		position: absolute;
		${initialBehind ? "z-index: -1;" : ""}
		right: ${initialRight[size]}px;
		bottom: ${initialBottom}px;
	`;

	const Separator: typeof View = styled(View)`
		position: absolute;
		left: -12px;
		top: 0px;
		width: 20px;
		height: 3px;
		background-color: white;
		border: 1px solid ${color};
		transform: rotate(-60deg);
		border-radius: 3px;
	`;

	return { Initial, Separator };
};

export const byStatAndSize = {
	health: {
		small: createComponents("health", "small"),
		medium: createComponents("health", "medium"),
	},
	sanity: {
		small: createComponents("sanity", "small"),
		medium: createComponents("sanity", "medium"),
	},
};
