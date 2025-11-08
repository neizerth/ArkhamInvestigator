import { ClueStatBackground } from "@modules/core/theme/shared/ui";
import { color, gameAssets } from "@shared/config";
import { IconNumber } from "@shared/ui";
import styled from "styled-components/native";
import { VALUE_HEIGHT } from "../../config";

export const Container: typeof ClueStatBackground = styled(ClueStatBackground)`
  width: ${VALUE_HEIGHT * gameAssets.clue.ratio}px;
  height: ${VALUE_HEIGHT}px;
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
