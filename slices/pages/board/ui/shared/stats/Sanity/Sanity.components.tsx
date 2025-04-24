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

export const BaseContainer = withStat(UI.Sanity, {
	ratio: gameAssets.sanity.ratio,
});

export const Background: typeof BaseContainer = styled(BaseContainer)`

`;

export const Container: typeof View = styled(View)`
	padding-top: ${size.gap.xxl}px;
	position: relative;
`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.sanity};
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
		zIndex: 6,
		right: 0,
		top: 0,
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
