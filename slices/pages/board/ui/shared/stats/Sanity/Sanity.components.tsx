import { assetsSize } from "@pages/board/config";
import { withStat } from "@pages/board/lib/hoc/withStat";
import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { StatPickerMemo as StatPicker } from "../StatPicker";
import { Value as BaseValue } from "../Value";

export const BaseContainer = withStat(UI.Sanity, {
	ratio: gameAssets.sanity.ratio,
});

export const Container: typeof BaseContainer = styled(BaseContainer)`
  padding-bottom: 3px;
`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.sanity};
`;

export const Wounds: typeof Value = styled(Value)`
  
`;

export const InitialDiff: typeof UI.TouchableOpacity = styled(
	UI.TouchableOpacity,
)`
  position: absolute;
  z-index: 3;
  right: 0px;
  top: -45px;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`;

export const DiffValue: typeof Value = styled(Value)`
  font-size: 30px;
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
