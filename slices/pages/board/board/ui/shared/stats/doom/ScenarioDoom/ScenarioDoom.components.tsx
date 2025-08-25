import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import styled from "styled-components/native";
import { withStat } from "../../../../../lib";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

export const BaseContainer = withStat(UI.Doom, {
	ratio: gameAssets.doom.ratio,
});

export const Container: typeof BaseContainer = styled(BaseContainer)`
  
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.doom.dark,
	},
	textStyle: {
		color: color.black,
	},
	stroke: false,
})`
  position: absolute;
`;
