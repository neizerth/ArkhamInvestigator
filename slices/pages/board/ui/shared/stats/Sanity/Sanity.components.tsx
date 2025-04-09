import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import { Value as BaseValue } from "@widgets/investigator/value";
import type { FC } from "react";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../common";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(UI.Sanity, {
	ratio: gameAssets.sanity.ratio,
});

export const Container: typeof BaseContainer = styled(BaseContainer)`

`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.sanity};
`;

export const Wounds: typeof Value = styled(Value)`
  
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
		zIndex: 5,
		right: 0,
		top: -42,
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
