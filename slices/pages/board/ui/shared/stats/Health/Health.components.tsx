import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import { Value as BaseValue } from "@widgets/investigator/value";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(UI.Health, {
	ratio: gameAssets.health.ratio,
});

export const Content: typeof BaseContainer = styled(BaseContainer)`
`;

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.health};
`;

export const BaseHealth: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	statType: "health",
	valueStyle: {
		color: color.health,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 4,
		right: -25,
		top: -40,
	},
	gap: 5,
})`
    
  `;

export const Wounds: typeof Value = styled(Value)`

`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.health,
	},
	itemHeight: assetsSize.main,
})`
    position: absolute;
    z-index: 1;
  `;
