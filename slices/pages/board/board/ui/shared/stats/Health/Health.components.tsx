import { color, gameAssets, size } from "@shared/config";
import * as UI from "@shared/ui";
import { Value as BaseValue } from "@widgets/investigator/value";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(UI.Health, {
	ratio: gameAssets.health.ratio,
});

export const Content: typeof BaseContainer = styled(BaseContainer)`
`;

export const Container: typeof View = styled(View)`
  position: relative;
	padding-top: ${size.gap.xxl}px;
`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.health};
`;

export const Initial: typeof View = styled(View)`
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
		top: 0,
	},
	gap: 5,
})`
    
  `;

export const Additional: typeof Value = styled(Value)`

`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.health,
	},
	itemHeight: assetsSize.main,
})`
    position: absolute;
    z-index: 1;
  `;
