import { assetsSize } from "@pages/board/config";
import { withStat } from "@pages/board/lib/hoc/withStat";
import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { StatPicker } from "../StatPicker";
import { Value as BaseValue } from "../Value";

export const BaseContainer = withStat(UI.Health, {
	ratio: gameAssets.health.ratio,
});

export const Container: typeof BaseContainer = styled(BaseContainer)`

`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.health};
`;

export const InitialDiff: typeof UI.TouchableOpacity = styled(
	UI.TouchableOpacity,
)`
  position: absolute;
  z-index: 3;
  right: -15px;
  top: -45px;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`;

export const DiffValue: typeof Value = styled(Value)`
  font-size: 30px;
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
