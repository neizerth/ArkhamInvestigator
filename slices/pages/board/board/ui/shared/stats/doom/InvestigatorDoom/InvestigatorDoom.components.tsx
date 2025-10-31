import { DoomStatBackground } from "@modules/core/theme/shared/ui";
import { color, gameAssets } from "@shared/config";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../config";
import { withStat } from "../../../../../lib";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

export const BaseContainer = withStat(DoomStatBackground, {
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
	itemHeight: assetsSize.main,
	stroke: false,
})`
  
  `;
