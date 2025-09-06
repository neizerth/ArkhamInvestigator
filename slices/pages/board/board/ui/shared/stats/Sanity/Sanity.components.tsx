import { color, gameAssets, size } from "@shared/config";
import * as UI from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(UI.Sanity, {
	ratio: gameAssets.sanity.ratio,
});

export const Background: typeof BaseContainer = styled(BaseContainer)`

`;

export const Container: typeof View = styled(View)`
	padding-top: ${size.gap.xl}px;
	position: relative;
`;

export const Value: typeof UI.Value = styled(UI.Value)`
  color: ${color.sanity};
`;

export const Initial: typeof View = styled(View)`
  position: absolute;
	right: 8px;
	bottom: -12px;
`;

export const InitialSeparator: typeof View = styled(View)`
  position: absolute;
	left: -12px;
	top: 0px;
	width: 20px;
	height: 3px;
	background-color: white;
	border: 1px solid ${color.sanity};
	transform: rotate(-60deg);
	border-radius: 3px;
`;

export const InitialValue: typeof Value = styled(Value)`
  font-size: 24px;
`;

export const Additional: typeof Value = styled(Value)`
  
`;

export const BaseSanity: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	statType: "sanity",
	valueStyle: {
		color: color.sanity,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 4,
		right: 0,
		top: -10,
	},
	gap: 5,
})`
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.sanity,
	},
	itemHeight: assetsSize.main,
})`
    position: absolute;
    z-index: 1;
  `;
