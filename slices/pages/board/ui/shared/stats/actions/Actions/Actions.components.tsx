import { color, gameAssets, size } from "@shared/config";
import { Action } from "@shared/ui";
import { Value } from "@widgets/investigator/value";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../config";
import { withStat } from "../../../../../lib";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../../common";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";
import { SpecialActions } from "../SpecialActions";

const BaseBackground = withStat(Action, {
	height: assetsSize.action,
	ratio: gameAssets.action.ratio,
});

export const Background: typeof BaseBackground = styled(BaseBackground)`
  align-items: stretch;
  position: relative;
`;

export const Container: typeof View = styled(View)`
  padding-top: ${size.gap.xxl}px;
`;

export const Content: typeof View = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Special: typeof SpecialActions = styled(SpecialActions)`
  position: absolute;
  bottom: 13px;
  left: 90px;
`;

export const BaseActions: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	statType: "actions",
	valueStyle: {
		color: color.action,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 1,
		right: -15,
		top: 0,
	},
	gap: 5,
})`
    
`;

export const DiffValue: typeof Value = styled(Value)`
  font-size: 30px;
  color: ${color.action};
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.action,
	},
	itemHeight: assetsSize.action + 5,
})`
    position: absolute;
    z-index: 2;
  `;
