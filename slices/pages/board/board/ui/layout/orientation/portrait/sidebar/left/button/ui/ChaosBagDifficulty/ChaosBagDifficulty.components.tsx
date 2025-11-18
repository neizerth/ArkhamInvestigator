import { color } from "@shared/config";
import { Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../../../../../config";
import { StatPicker } from "../../../../../../../../shared";

export const Container: typeof View = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 42px;
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.resource,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
})`
  position: absolute;
`;

export const Character: typeof Text = styled(Text)`
  position: absolute;
  top: -5px;
  left: -13px;
  font-size: 28px;
  line-height: 28px;
  height: 28px;
`;
