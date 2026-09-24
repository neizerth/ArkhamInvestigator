import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui/value";
import { color, size } from "@shared/config";
import * as UI from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const Content: FC<Omit<StatFigureProps, "stat" | "size">> = (props) => (
	<StatFigure {...props} stat="handSize" size="medium" />
);

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
	testID: "hand-size-base-picker",
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
	testID: "hand-size-picker",
	valueStyle: {
		color: color.handSize,
	},
	itemHeight: assetsSize.main,
})`
    position: absolute;
    z-index: 1;
  `;
