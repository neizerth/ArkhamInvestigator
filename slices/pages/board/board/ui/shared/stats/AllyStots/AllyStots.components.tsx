import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui/value";
import { color } from "@shared/config";
import * as UI from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

const contentStyle = {
	top: 2,
};

export const Content: FC<Omit<StatFigureProps, "stat" | "size">> = ({
	style,
	...props
}) => (
	<StatFigure
		{...props}
		stat="allySlots"
		size="medium"
		style={[contentStyle, style]}
	/>
);

export const Container: typeof View = styled(View)`
  position: relative;
	min-width: ${assetsSize.ally}px;
	align-items: center;

`;

export const Value: typeof UI.Value = styled(UI.Value)`
  color: ${color.ally};
`;

export const BaseAllySlots: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	testID: "ally-slots-base-picker",
	statType: "allySlots",
	valueStyle: {
		color: color.ally,
		fontSize: 42,
	},
	itemHeight: assetsSize.ally,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 2,
		right: -20,
		top: -40,
	},
	gap: 5,
})`
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	testID: "ally-slots-picker",
	valueStyle: {
		color: color.ally,
	},
	itemHeight: assetsSize.main,
})`
    position: absolute;
    z-index: 1;
  `;
