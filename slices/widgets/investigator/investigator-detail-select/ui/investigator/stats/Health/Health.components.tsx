import { color } from "@shared/config";
import { Health, IconNumber } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Health = styled(Health)`
  width: 24px;
  height: 30px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.health,
	},
})`
    font-size: 24px;
    color: white;
  `;
