import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(UI.Doom, {
	ratio: gameAssets.doom.ratio,
});

export const Container: typeof BaseContainer = styled(BaseContainer)`
  
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.doom.light,
	},
	textStyle: {
		color: color.black,
	},
	itemHeight: assetsSize.main,
	stroke: false,
})`
  
  `;
