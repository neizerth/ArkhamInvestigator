import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui";
import { color, size } from "@shared/config";
import { Value } from "@shared/ui";
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
import { SpecialActions } from "../special/SpecialActions";

const backgroundStyle = {
	alignItems: "stretch" as const,
	position: "relative" as const,
};

export const Background: FC<Omit<StatFigureProps, "stat" | "size">> = ({
	style,
	...props
}) => (
	<StatFigure
		{...props}
		stat="actions"
		size="medium"
		style={[backgroundStyle, style]}
	/>
);

export const Container: typeof View = styled(View)`
  padding-top: ${size.gap.xl}px;
`;

export const Content: typeof View = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Special: typeof SpecialActions = styled(SpecialActions)`
  position: absolute;
  bottom: 10px;
  left: 90px;
`;

export const BasePickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
	testID: "actions-base-value",
})``;

export const BaseActions: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	testID: "actions-base-picker",
	Component: BasePickerValue,
	statType: "actions",
	valueStyle: {
		color: color.action,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 1,
		right: -20,
		top: -10,
	},
	gap: 5,
})`
`;

export const DiffValue: typeof Value = styled(Value)`
  font-size: 30px;
  color: ${color.action};
`;

export const PickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
	testID: "actions-value",
})``;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	testID: "actions-picker",
	Component: PickerValue,
	valueStyle: {
		color: color.action,
	},
	itemHeight: assetsSize.action + 5,
})`
	position: absolute;
	z-index: 2;
`;
