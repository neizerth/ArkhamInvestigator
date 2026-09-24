import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui/value";
import { color, size } from "@shared/config";
import * as UI from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../config";
import {
	BaseStatPicker,
	BoardValue,
	type BoardValueProps,
	type DefinedBaseStatPickerProps,
} from "../../common";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

export const Container: typeof View = styled(View)`
	position: relative;
	margin-top: ${-size.gap.xxl}px;
	padding-top: ${size.gap.xxl}px;
	min-width: ${assetsSize.main}px;
	align-items: center;
`;

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

export const Value: typeof UI.Value = styled(UI.Value)`
  color: ${color.resource};
`;

export const UpkeepResources: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	testID: "resources-upkeep-picker",
	statType: "upkeepResourcesIncrease",
	valueStyle: {
		color: color.resource,
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
})`
`;

export const PickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
	testID: "resources-value",
})``;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	testID: "resources-picker",
	Component: PickerValue,
	valueStyle: {
		color: color.resource,
	},
	itemHeight: assetsSize.resource,
})`
	position: absolute
`;
