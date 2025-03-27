import { TouchableOpacity } from "@features/haptic";
import { assetsSize } from "@pages/board/config";
import { withStat } from "@pages/board/lib/hoc/withStat";
import { color, gameAssets } from "@shared/config";
import { Action, Icon } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";
import { Value } from "../common/Value";

const BaseBackground = withStat(Action, {
	height: assetsSize.action,
	ratio: gameAssets.action.ratio,
});

export const Container: typeof BaseBackground = styled(BaseBackground)`
  align-items: stretch;
  position: relative;
`;

export const Content: typeof View = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AdditionalAction: typeof TouchableOpacity = styled(
	TouchableOpacity,
)`
  position: absolute;
  z-index: 3;
  bottom: 12px;
  right: -45px;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`;

export const BaseActions: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	statType: "actions",
	valueStyle: {
		color: color.action,
		fontSize: 30,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 1,
		right: -15,
		top: -30,
	},
	gap: 5,
})`
    
`;

export const DiffValue: typeof Value = styled(Value)`
  font-size: 30px;
  color: ${color.action};
`;

export const ActionIcon: typeof Icon = styled(Icon)`
  font-size: 30px;
  color: ${color.white};
`;

export const UsedAction: typeof Icon = styled(Icon)`
  font-size: 35px;
  color: ${color.health};
  position: absolute;
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
