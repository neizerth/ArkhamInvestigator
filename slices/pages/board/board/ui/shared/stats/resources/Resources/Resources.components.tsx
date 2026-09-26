import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui";
import type { StatSourceType } from "@shared/model";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../config";
import {
	BaseStatPicker,
	BoardValue,
	type BoardValueProps,
	type DefinedBaseStatPickerProps,
} from "../../common";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

export const Container: typeof View = styled(View)`
  ${({ theme: { size } }) => css`
	position: relative;
	margin-top: ${-size.gap.xxl}px;
	padding-top: ${size.gap.xxl}px;
	min-width: ${assetsSize.main}px;
	align-items: center;
`}`;

const contentStyle = {
	position: "relative" as const,
};

export const Content: FC<Omit<StatFigureProps, "stat" | "size">> = ({
	style,
	...props
}) => (
	<StatFigure
		{...props}
		stat="resources"
		size="medium"
		style={[contentStyle, style]}
	/>
);

export const UpkeepResources: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs(({ theme }) => ({
	testID: "resources-upkeep-picker",
	statType: "upkeepResourcesIncrease",
	valueStyle: {
		color: theme.color.resource,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 2,
		right: -10,
		top: -0,
	},
	gap: 5,
}))`
`;

const createPickerValue = (type: StatSourceType): FC<BoardValueProps> =>
	styled(BoardValue).attrs({
		testID: `${type}-resources-value`,
	})``;

const pickerValues: Record<StatSourceType, FC<BoardValueProps>> = {
	investigator: createPickerValue("investigator"),
	scenario: createPickerValue("scenario"),
};

export const pickerValue = (type: StatSourceType) => pickerValues[type];

export const Picker: typeof StatPicker = styled(StatPicker).attrs(
	({ theme }) => ({
		valueStyle: {
			color: theme.color.resource,
		},
		itemHeight: assetsSize.resource,
	}),
)`
	position: absolute
`;
