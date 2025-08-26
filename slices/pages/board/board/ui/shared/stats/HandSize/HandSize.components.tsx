import { color, gameAssets, size } from "@shared/config";
import * as UI from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(UI.HandSize, {
	height: assetsSize.main,
	ratio: gameAssets.handSize.ratio,
});

export const Content: typeof BaseContainer = styled(BaseContainer)`
`;

export const Container: typeof View = styled(View)`
  position: relative;
	padding-top: ${size.gap.xxl}px;
	padding-bottom: ${size.gap.default}px;
	min-width: ${assetsSize.main}px;
	align-items: center;
`;

export const Value: typeof UI.Value = styled(UI.Value)`
  color: ${color.handSize};
`;

export const BaseHandSize: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	statType: "handSize",
	valueStyle: {
		color: color.handSize,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 2,
		right: -10,
		top: -5,
	},
	gap: 5,
})`
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.handSize,
	},
	itemHeight: assetsSize.main,
})`
    position: absolute;
    z-index: 1;
  `;
