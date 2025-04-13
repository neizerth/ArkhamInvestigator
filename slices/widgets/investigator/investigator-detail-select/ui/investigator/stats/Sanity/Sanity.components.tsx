import { color } from "@shared/config";
import { IconNumber, Sanity } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Sanity = styled(Sanity)`
  width: 40px;
  height: 30px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.sanity,
	},
})`
    font-size: 24px;
    color: white;
  `;
