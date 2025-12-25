import { Checkbox, Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  align-items: center;
  justify-content: flex-end;
`;

export const Control: typeof Checkbox = styled(Checkbox).attrs({
	contentStyle: {
		gap: 10,
	},
})`
  min-height: 40px;
`;
