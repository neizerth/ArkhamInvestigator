import { AllyStatBackground } from "@modules/core/theme/shared/ui";
import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(AllyStatBackground, {
	height: assetsSize.ally,
	ratio: gameAssets.ally.ratio,
});

export const Content: typeof BaseContainer = styled(BaseContainer)`
	top: 2px;
`;

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
	valueStyle: {
		color: color.ally,
	},
	itemHeight: assetsSize.main,
})`
    position: absolute;
    z-index: 1;
  `;
