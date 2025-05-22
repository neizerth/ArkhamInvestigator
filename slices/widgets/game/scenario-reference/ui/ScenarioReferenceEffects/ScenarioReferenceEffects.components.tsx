import { ChaosToken } from "@features/chaos-bag";
import { color } from "@shared/config";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components";
import { GameText } from "../../../game-text";
import { refPx as upx } from "../../lib";

export const Container: typeof View = styled(View)`
  gap: ${upx(5)}
`;

export const TokenGroup: typeof Row = styled(Row)`
  gap: ${upx(3)};
  align-items: center;
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const TokenEffect: typeof GameText = styled(GameText).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
  color: ${color.text};
`;
