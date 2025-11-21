import { color } from "@shared/config";
import { Checkbox, Row } from "@shared/ui";
import styled from "styled-components/native";
import { refPx as upx } from "../../lib";

export const Container: typeof Row = styled(Row)`
   align-items: center;
  justify-content: flex-end;
  padding-right: ${upx(6)};
`;

export const Control: typeof Checkbox = styled(Checkbox).attrs({
	contentStyle: {
		gap: 10,
	},
})`
  height: 40px;
  color: ${color.text};
`;
