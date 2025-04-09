import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import { Value as BaseValue } from "@widgets/investigator/value";
import styled from "styled-components/native";
import { assetsSize } from "../../../../config";
import { withStat } from "../../../../lib";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const BaseContainer = withStat(UI.Clue, {
	ratio: gameAssets.clue.ratio,
});

export const Container: typeof BaseContainer = styled(BaseContainer)`
  
`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.clue};
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.clue,
	},
	itemHeight: assetsSize.main,
})`
  
  `;
