import { assetsSize } from "@pages/board/config";
import { withStat } from "@pages/board/lib/hoc/withStat";
import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import styled from "styled-components/native";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";
import { Value as BaseValue } from "../common/Value";

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
