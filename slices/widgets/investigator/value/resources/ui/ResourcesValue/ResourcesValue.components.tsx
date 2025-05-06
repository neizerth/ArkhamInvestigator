import { color } from "@shared/config";
import { IconNumber, Resource } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Resource = styled(Resource)`
  width: 30px;
  height: 30px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
	contentContainerStyle: {
		flex: 0,
	},
	strokeStyle: {
		color: color.resource,
	},
})`
    font-size: 24px;
    color: white;
  `;
