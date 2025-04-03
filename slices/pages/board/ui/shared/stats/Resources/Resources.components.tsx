import { assetsSize } from "@pages/board/config";
import { withStat } from "@pages/board/lib/hoc/withStat";
import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import { Value as BaseValue } from "@widgets/investigator/value";
import styled from "styled-components/native";
import { StatPickerMemo as StatPicker } from "../common/StatPicker";

export const Container = withStat(UI.Resource, {
	height: assetsSize.resource,
	ratio: gameAssets.resource.ratio,
});

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.resource};
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.resource,
	},
	itemHeight: assetsSize.resource,
})`
  
  `;
