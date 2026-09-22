import { HealthStatBackground } from "@modules/core/theme/shared/ui";
import { color, gameAssets, size } from "@shared/config";
import { Value as BaseValue } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import {
	BaseStatPicker,
	BoardValue,
	type BoardValueProps,
	type DefinedBaseStatPickerProps,
} from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(HealthStatBackground, {
	ratio: gameAssets.health.ratio,
});

export const Content: typeof BaseContainer = styled(BaseContainer).attrs({
	testID: "health-background",
})`
`;

export const PickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
	testID: "health-value",
})``;

export const BasePickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
	testID: "health-base-value",
})``;

export const Container: typeof View = styled(View)`
  position: relative;
	padding-top: ${size.gap.xl}px;
`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.health};
`;

export const Initial: typeof View = styled(View).attrs({
	testID: "health-initial",
})`
  position: absolute;
	right: -10px;
	bottom: -12px;
`;

export const InitialSeparator: typeof View = styled(View)`
  position: absolute;
	left: -12px;
	top: 0px;
	width: 20px;
	height: 3px;
	background-color: white;
	border: 1px solid ${color.health};
	transform: rotate(-60deg);
	border-radius: 3px;
`;

export const InitialValue: typeof Value = styled(Value)`
  font-size: 24px;
`;

export const BaseHealth: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	testID: "health-base-picker",
	Component: BasePickerValue,
	statType: "health",
	valueStyle: {
		color: color.health,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 4,
		right: -25,
		top: -10,
	},
	gap: 5,
})`
`;

export const Additional: typeof Value = styled(Value).attrs({
	testID: "health-additional",
})`

`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	testID: "health-picker",
	Component: PickerValue,
	valueStyle: {
		color: color.health,
	},
	itemHeight: assetsSize.main,
})`
    position: absolute;
    z-index: 1;
  `;
