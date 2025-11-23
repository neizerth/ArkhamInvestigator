import { color } from "@shared/config";
import { Row, Text, Value } from "@shared/ui";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../../../../../config";
import { StatPicker } from "../../../../../../../../shared";

export const Container: typeof Row = styled(Row)`
  position: relative;
  width: 42px;
`;

export const FixedValue: typeof Value = styled(Value)`
  color: ${color.resource};
  font-size: 21px;
  text-align: right;
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.resource,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
})`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 42px;
`;

export const Character: typeof Text = styled(Text)`
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 28px;
  line-height: 20px;
`;
