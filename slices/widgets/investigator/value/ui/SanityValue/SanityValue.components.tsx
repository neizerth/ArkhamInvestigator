import { color, gameAssets } from "@shared/config";
import { IconNumber, Sanity } from "@shared/ui";
import styled from "styled-components/native";
import { VALUE_HEIGHT } from "../../config";

export const Container: typeof Sanity = styled(Sanity)`
  width: ${VALUE_HEIGHT * gameAssets.sanity.ratio}px;
  height: ${VALUE_HEIGHT}px;
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
