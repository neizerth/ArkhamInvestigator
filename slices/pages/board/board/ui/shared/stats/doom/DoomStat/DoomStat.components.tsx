import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui";
import { color } from "@shared/config";
import type { StatSourceType } from "@shared/model";
import type { FC } from "react";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../config";
import { BoardValue, type BoardValueProps } from "../../common";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

const createComponents = (type: StatSourceType) => {
	const Container: FC<Omit<StatFigureProps, "stat" | "size">> = (props) => (
		<StatFigure {...props} stat="doom" size="medium" />
	);

	const PickerValue: FC<BoardValueProps> = styled(BoardValue).attrs({
		testID: `${type}-doom-value`,
	})``;

	const Picker: typeof StatPicker = styled(StatPicker).attrs({
		testID: `${type}-doom-picker`,
		Component: PickerValue,
		valueStyle: {
			color: color.doom.dark,
		},
		textStyle: {
			color: color.black,
		},
		itemHeight: assetsSize.main,
		stroke: false,
	})`
		${type === "scenario" ? "position: absolute;" : ""}
	`;

	return { Container, Picker };
};

export const byType = {
	investigator: createComponents("investigator"),
	scenario: createComponents("scenario"),
};
