import { color } from "@shared/config";
import { Clue, IconNumber } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Clue = styled(Clue)`
  width: 30px;
  height: 30px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.clue,
	},
})`
    font-size: 24px;
    color: white;
  `;
