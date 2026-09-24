import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui/value";
import { color } from "@shared/config";
import type { FC } from "react";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../config";
import { BoardValue, type BoardValueProps } from "../../common";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

export const Container: FC<Omit<StatFigureProps, "stat" | "size">> = (
	props,
) => <StatFigure {...props} stat="doom" size="medium" />;

export const PickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
	testID: "doom-value",
})``;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	testID: "doom-picker",
	Component: PickerValue,
	valueStyle: {
		color: color.doom.dark,
	},
	textStyle: {
		color: color.black,
	},
	stroke: false,
	itemHeight: assetsSize.main,
})`
  position: absolute;
`;
