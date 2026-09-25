import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";
import {
	type CapacityStatType,
	capacityStatStyles,
} from "./CapacityStat.styles";

const createComponents = (stat: CapacityStatType) => {
	const {
		color,
		testID,
		minWidth,
		paddingTop,
		paddingBottom,
		contentStyle,
		baseItemHeight,
		baseOffset,
	} = capacityStatStyles[stat];

	const Content: FC<Omit<StatFigureProps, "stat" | "size">> = ({
		style,
		...props
	}) => (
		<StatFigure
			{...props}
			stat={stat}
			size="medium"
			style={[contentStyle, style]}
		/>
	);

	const Container: typeof View = styled(View)`
		position: relative;
		min-width: ${minWidth}px;
		padding-top: ${paddingTop}px;
		padding-bottom: ${paddingBottom}px;
		align-items: center;
	`;

	const Base: FC<DefinedBaseStatPickerProps> = styled(BaseStatPicker).attrs({
		testID: `${testID}-base-picker`,
		statType: stat,
		valueStyle: {
			color,
			fontSize: 42,
		},
		itemHeight: baseItemHeight,
		contentContainerStyle: {
			position: "absolute",
			zIndex: 2,
			...baseOffset,
		},
		gap: 5,
	})``;

	// the picker keeps the main item height even where the asset is smaller
	const Picker: typeof StatPicker = styled(StatPicker).attrs({
		testID: `${testID}-picker`,
		valueStyle: {
			color,
		},
		itemHeight: assetsSize.main,
	})`
		position: absolute;
		z-index: 1;
	`;

	return { Container, Content, Base, Picker };
};

export const byStat = {
	handSize: createComponents("handSize"),
	allySlots: createComponents("allySlots"),
};
