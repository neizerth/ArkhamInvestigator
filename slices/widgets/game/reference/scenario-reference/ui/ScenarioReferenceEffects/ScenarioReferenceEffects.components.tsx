import { ChaosToken } from "@features/game/chaos-bag";
import { color } from "@shared/config";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components";
import { GameText } from "../../../../game-text";
import { refPx as upx } from "../../lib";

export const Container: typeof View = styled(View)`
  gap: ${upx(5)}
`;

export const Item: typeof Row = styled(Row)`
  gap: ${upx(2)};
  align-items: center;
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const TokenGroup: typeof View = styled(View)`
  gap: ${upx(1.5)};
  padding-right: ${upx(2)};
  border-right-color: rgba(175, 164, 146, 0.7);
  border-right-width: ${upx(0.5)};
`;

export const TokenEffect: typeof GameText = styled(GameText).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
  color: ${color.text};
`;
