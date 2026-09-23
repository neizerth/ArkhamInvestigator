import { DoomStatBackground } from "@modules/core/theme/shared/ui";
import { color, gameAssets } from "@shared/config";
import type { FC } from "react";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../config";
import { withStat } from "../../../../../lib";
import { BoardValue, type BoardValueProps } from "../../common";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

export const BaseContainer = withStat(DoomStatBackground, {
	ratio: gameAssets.doom.ratio,
});

export const Container: typeof BaseContainer = styled(BaseContainer)`
  
`;

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
