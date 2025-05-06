import { color } from "@shared/config";
import { Action, IconNumber } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Action = styled(Action)`
  width: 39px;
  height: 30px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.action,
	},
})`
    font-size: 24px;
    color: white;
  `;
